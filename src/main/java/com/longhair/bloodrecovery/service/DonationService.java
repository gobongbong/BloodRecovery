package com.longhair.bloodrecovery.service;

import com.longhair.bloodrecovery.entity.CardRequest;
import com.longhair.bloodrecovery.entity.Donation;
import com.longhair.bloodrecovery.repository.CardDonationRepository;
import com.longhair.bloodrecovery.repository.DonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;
    private final CardDonationRepository cardDonationRepository;

    private final static String userUrl = "http://bloodrecovery-lb-1423483073.us-east-2.elb.amazonaws.com:8000/user/";
    private final static String messageUrl = "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/notice/message";

    //기부자 목록 조회 => 기부 요청글 밑에 출력
    public List<Donation> findList(Long id) {
        return donationRepository.findDonationByCardRequestId(id);
    }

    //기부하기
    public Donation donate(Donation donation, Long id){

        /* 1. Donation 정보 저장 */
        Donation savedonation = new Donation();
        savedonation.setId(donation.getId());
        savedonation.setUserId(donation.getUserId());
        savedonation.setCode(donation.getCode());
        savedonation.setGiveCount(donation.getGiveCount());

        // User 불러오기
        RestTemplate rt = new RestTemplate();
        String location = userUrl + "info/" + donation.getUserId();
        Map map = rt.getForObject(location, Map.class);
        savedonation.setNickname(map.get("nickname").toString());
        savedonation.setPoint(Integer.parseInt(map.get("point").toString()));

        //기부자 포인트 추가하기
        location = userUrl + "point";
        Map<String, Object> pointMap = new HashMap<>();
        pointMap.put("userId", donation.getUserId());
        pointMap.put("plusPoint", 50); //헌혈증 기부로 50포인트 추가
        pointMap.put("breakdown", "헌혈증 기부");

        ResponseEntity<Map> result = rt.exchange(location, HttpMethod.PUT, new HttpEntity<>(pointMap), Map.class);
        if (!Boolean.parseBoolean(result.getBody().get("result").toString())){
            return new Donation();
        }

        // 기부 요청글 조회
        CardRequest cardRequest = cardDonationRepository.findById(id).get();
        savedonation.setCardRequest(cardRequest);

        /* 2. CardRequest 정보 조회 => 매핑 테이블의 외래키로 저장하기 위해서 */
        cardRequest.setId(cardRequest.getId());
        cardRequest.setDonationCount(cardRequest.getDonationCount() + donation.getGiveCount());//기부받은 개수만큼 추가
        if (cardRequest.getRequestCount() == cardRequest.getDonationCount()){
            cardRequest.setCompleteStatus(true);
        }//요청개수를 다 채우면 완료상태를 true로 변경

        //메시지 보내기
        sendMessage(cardRequest, savedonation);

        //기부 정보 저장
        Donation saveDonation = donationRepository.save(savedonation);


        return saveDonation;
    }

    private void sendMessage(CardRequest cardRequest, Donation donation){
        RestTemplate rt = new RestTemplate();
        Map<String, String> map = new HashMap<>();
        map.put("producer", donation.getUserId());
        map.put("consumer", cardRequest.getUserId());
        map.put("title", "헌혈증을 기부 받았어요!");
        map.put("contents", donation.getNickname() + "님께서 헌혈증을 기부해주셨습니다!");

        rt.postForObject(messageUrl, map, Map.class);
    }

}
