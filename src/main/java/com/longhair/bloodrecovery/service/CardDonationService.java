package com.longhair.bloodrecovery.service;

import com.longhair.bloodrecovery.dto.CardRequestSimpleDto;
import com.longhair.bloodrecovery.dto.CardRequestUpdateDto;
import com.longhair.bloodrecovery.dto.SearchData;
import com.longhair.bloodrecovery.entity.CardRequest;
import com.longhair.bloodrecovery.repository.CardDonationRepository;
import com.longhair.bloodrecovery.repository.DonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class CardDonationService {

    private final CardDonationRepository cardDonationRepository;
    private final DonationRepository donationRepository;
    private final static int vipLevel = 4;

    private final static String userUrl = "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/";

    //기부 요청글 전체 조회 (필터링 포함)
    public List<CardRequestSimpleDto> findCardRequestAll(SearchData searchData){
        List<CardRequestSimpleDto> cardRequestSimpleDtos = new ArrayList<>();
        List<CardRequest> cardRequests = new ArrayList<>();

        switch (searchData.getSearchMode()){
            case 0:     // 필터링 모드 없는 것.(Status = false)
                cardRequests = cardDonationRepository.findCardRequestByCompleteStatus(false);
                break;
            case 2: //리액트때 민정이꺼 보기 편할려고 2로 해놓음ㅎ
                cardRequests = cardDonationRepository.findCardRequestByCompleteStatus(true);
                break;
            default:
                break;
        }

        Collections.reverse(cardRequests);

        List<CardRequest> vipItems = new ArrayList<>();
        List<CardRequest> normalItems = new ArrayList<>();
        cardRequests.forEach(e -> {
            if(e.getLevel() >= vipLevel){
                vipItems.add(e);
            }
            else{
                normalItems.add(e);
            }
        });

        vipItems.forEach(e -> cardRequestSimpleDtos.add(new CardRequestSimpleDto(e)));
        normalItems.forEach(e -> cardRequestSimpleDtos.add(new CardRequestSimpleDto(e)));

        return cardRequestSimpleDtos;

    }

    //기부 요청글 내가 쓴 글 조회
    public List<CardRequest> myboard(String userId) {
        List<CardRequest> opt = cardDonationRepository.findByUserId(userId);
        return opt;
    }


    //기부 특정 요청글 조회
    public CardRequest findById(Long id) {
        Optional<CardRequest> opt = cardDonationRepository.findById(id);
        return opt.get();
    }


    //기부 요청글 등록
    public CardRequest saveCardRequest(CardRequest cardRequest){

        RestTemplate rt = new RestTemplate();
        String location = userUrl + "point";
        Map<String, Object> pointMap = new HashMap<>();
        pointMap.put("userId", cardRequest.getUserId());
//        pointMap.put("plusPoint", (cardRequest.getRequestCount() - cardRequest.getDonationCount()) * 50);
        pointMap.put("plusPoint", (cardRequest.getDonationCount()) * 50);
        //((요청한 헌혈증 개수 - 기부 받은 헌혈증 개수) * 50 )만큼 포인트 돌려받기
        pointMap.put("minusPoint", cardRequest.getRequestCount() * 50); //요청 수 마다 50포인트 차감
        pointMap.put("breakdown", "헌혈증 기부 요청");

        ResponseEntity<Map> result = rt.exchange(location, HttpMethod.PUT, new HttpEntity<>(pointMap), Map.class);
        if (!Boolean.parseBoolean(result.getBody().get("result").toString())){
            return new CardRequest();
        }

        location = userUrl + "info/" + cardRequest.getUserId();
        Map map = rt.getForObject(location, Map.class);
        cardRequest.setNickname(map.get("nickname").toString());
        cardRequest.setLevel(Integer.parseInt(map.get("level").toString()));
        cardRequest.setPoint(Integer.parseInt(map.get("point").toString()));

        cardRequest.setCompleteStatus(false); //완료상태가 아니다!
        cardRequest.setRequestDate(LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'hh:mm"))));

        cardDonationRepository.save(cardRequest);

        return cardRequest;
    }

    //기부 요청글 삭제
    public void deleteCardRequestById(Long id, CardRequest cardRequest){
        Optional<CardRequest> item = cardDonationRepository.findById(id);
        List<Long> idList = new ArrayList<>();
        donationRepository.deleteByCardRequestId(id); //기부 내역 삭제
        cardDonationRepository.deleteById(id);

        //삭제했을 경우 포인트 캐쉬백
        RestTemplate rt = new RestTemplate();
        String location = userUrl + "point";

        Map<String, Object> pointMap = new HashMap<>();
        pointMap.put("userId", cardRequest.getUserId());
        pointMap.put("plusPoint", (cardRequest.getRequestCount() - cardRequest.getDonationCount()) * 50);
        //((요청한 헌혈증 개수 - 기부 받은 헌혈증 개수) * 50 )만큼 포인트 돌려받기
        pointMap.put("breakdown", "요청 중단 및 삭제로 인한 포인트 캐시백");

        ResponseEntity<Map> result = rt.exchange(location, HttpMethod.PUT, new HttpEntity<>(pointMap), Map.class);

    }

    //기부 요청글 수정
    public void updateCardRequestById(CardRequestUpdateDto cardRequestUpdateDto, CardRequest cardRequest){
        Optional<CardRequest> e = cardDonationRepository.findById(cardRequestUpdateDto.getId());
        if (e.isPresent()){
            CardRequest item = e.get();
            item.setId(cardRequestUpdateDto.getId());
            item.setUserId(cardRequestUpdateDto.getUserId());
            item.setTitle(cardRequestUpdateDto.getTitle());
            item.setContents(cardRequestUpdateDto.getContents());
            item.setImage(cardRequestUpdateDto.getImage());
            item.setCompleteStatus(cardRequestUpdateDto.getCompleteStatus());
            cardDonationRepository.save(item);

            if (cardRequestUpdateDto.getCompleteStatus() == true){
                //상태가 변경될 경우 포인트 캐쉬백
                RestTemplate rt = new RestTemplate();
                String location = userUrl + "point";

                Map<String, Object> pointMap = new HashMap<>();
                pointMap.put("userId", cardRequest.getUserId());
                pointMap.put("plusPoint", (cardRequest.getRequestCount() - cardRequest.getDonationCount()) * 50);
                //((요청한 헌혈증 개수 - 기부 받은 헌혈증 개수) * 50 )만큼 포인트 돌려받기
                pointMap.put("breakdown", "요청 중단 및 삭제로 인한 포인트 캐시백");

                ResponseEntity<Map> result = rt.exchange(location, HttpMethod.PUT, new HttpEntity<>(pointMap), Map.class);
            }
            System.out.println("업데이트 완료");
        }
    }



}
