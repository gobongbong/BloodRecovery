package com.longhair.bloodrecovery.service;

import com.google.cloud.vision.v1.*;
import com.longhair.bloodrecovery.domain.Card;
import com.longhair.bloodrecovery.dto.CardApplyDto;
import com.longhair.bloodrecovery.dto.OcrDto;
import com.longhair.bloodrecovery.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.regex.Pattern;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CardService {
    //헌혈증조회, 추가, 파일업로드, 헌혈증 기부하기-> 다른 유저의 지갑으로 이동(이걸 어케하지....)
    private final static String url = "http://BloodRecovery-LB-1423483073.us-east-2.elb.amazonaws.com:8000/user/info/";
    @Autowired
    private final CardRepository cardRepository;

    //헌혈증 조회
    public List<Card> findCards(String id) {
        return cardRepository.findByUserid(id);
    }

    //헌혈증 소유자 변경
    @Transactional
    public Card updateCard(Long cardid, String userid){
        Optional<Card> opt = cardRepository.findById(cardid);
        Card findCard = null;
        if(opt.isPresent()) {
            findCard = opt.get();
            findCard.setUserid(userid);
        }
        return cardRepository.save(findCard);
    }

    //헌혈증추가
    public Card save(Card card, String id){
        card.setUserid(id);
        return cardRepository.save(card);
    }

    public OcrDto useOcr(Image image){
        OcrDto ocrDto = new OcrDto();
        String compareName = "성 명: ";
        String compareType = "헌혈종류: ";
        String compareDate = "헌혈일자: ";

        //OCR 초기설정
        List<AnnotateImageRequest> requests = new ArrayList<>();
        Feature feature = Feature.newBuilder().setType(Feature.Type.DOCUMENT_TEXT_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feature).setImage(image).build();
        requests.add(request);

        //OCR 작동
        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            String responseString = "";
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            responseString += responses.get(0).getTextAnnotationsList().get(0).getDescription();
            log.info(responseString);

            String[] strings = responseString.split("\n");
            String name = "";
            String type = "";
            String date = "";
            String code = strings[0];
            for(String e : strings){
                if(e.contains(compareName)){
                    name = e.split(compareName)[1].split(" ")[0];
                }
                if(e.contains(compareType)){
                    type = e.split(compareType)[1];
                }
                if(e.contains(compareDate)){
                    date = e.split(compareDate)[1];
                }
            }
            log.info("result[ code:" + code + ", name:" + name + ", type:" + type + ", date:" + date + " ]");
            ocrDto.setName(name);
            ocrDto.setDonationType(type);
            ocrDto.setCode(code);
            ocrDto.setDate(date);
        } catch (Exception e){
            e.printStackTrace();
        }
        return ocrDto;
    }

    //map으로 나온 결과를 BIMS에 보내서 인증받는 메소드
    public boolean applyOcr(CardApplyDto cardApplyDto){
        //TODO
        //BIMS 인증
        boolean result = false;
        String exp = "^[0-9]{2}-[0-9]{2}-[0-9]{6}$";
        Card card1 = cardRepository.findCardByCode(cardApplyDto.getCode());
        if(card1 == null && Pattern.matches(exp, cardApplyDto.getCode())){
            result = true;
        }
        //RestTemplate rt = new RestTemplate();
        //Map item = rt.getForObject(url + cardApplyDto.getUserId(), Map.class);
        //if(item.get("name").equals(cardApplyDto.getName())){
            //BIMS 인증하기
        //}
        return result;
    }
}
