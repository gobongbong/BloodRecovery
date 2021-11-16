package com.longhair.bloodrecovery.service;

import com.longhair.bloodrecovery.domain.Point;
import com.longhair.bloodrecovery.domain.User;
import com.longhair.bloodrecovery.dto.FindDto;
import com.longhair.bloodrecovery.dto.PointDto;
import com.longhair.bloodrecovery.dto.UserInfoDto;
import com.longhair.bloodrecovery.dto.UserPutDto;
import com.longhair.bloodrecovery.repository.PointRepository;
import com.longhair.bloodrecovery.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
public class UserService {
    private final static int basePoint = 300;
    private final static int bronzeTier = 1000;
    private final static int angleTier = 2000;
    private final static int godTier = 3000;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PointRepository pointRepository;


    @Transactional
    public boolean checkId(String id){
        return userRepository.findUserByUserId(id) == null;
    }

    @Transactional
    public boolean checkNickname(String nickname){
        return userRepository.findUserByNickname(nickname) == null;
    }

    @Transactional
    public User registerUser(User user){
        user.setPoint(0);
        user.setLevel(1);
        userRepository.save(user);
        registerPoint(user.getUserId(), basePoint);
        return user;
    }

    @Transactional
    public void registerPoint(String userId, int point){
        PointDto pointDto = new PointDto();
        pointDto.setUserId(userId);
        pointDto.setPlusPoint(point);
        pointDto.setBreakdown("회원가입 축하 포인트");
        changePoint(pointDto);
    }
    @Transactional
    public boolean login(String userId, String password){
        User user = userRepository.findUserByUserId(userId);
        if(user == null){
            return false;
        }
        String result = Cypto.decrypt(user.getPassword(), "longhair");

        return result.equals(Cypto.decrypt(password, "longhair"));
    }

    @Transactional
    public void deleteUser(String userId){
        userRepository.deleteUserByUserId(userId);
    }

    @Transactional
    public String searchId(String name, String personalNumber){
        String result = "";
        List<User> items = userRepository.findUsersByName(name);
        String result1 = Cypto.decrypt(personalNumber, "longhair");
        for(User e : items){
            String result2 = Cypto.decrypt(e.getPersonalNumber(), "longhair");
            if(result1.equals(result2)){
                result = e.getUserId();
            }
        }
        return result;
    }

    @Transactional
    public boolean resetPassword(String userId, String password){
        User user = userRepository.findUserByUserId(userId);
        if(user == null){
            return false;
        }
        user.setPassword(password);
        userRepository.save(user);
        return true;
    }

    @Transactional
    public UserInfoDto getUserInfo(String userId){
        User user = userRepository.findUserByUserId(userId);
        if(user == null){
            return new UserInfoDto();
        }
        return new UserInfoDto(user);
    }

    @Transactional
    public UserInfoDto updateUserInfo(UserPutDto userPutDto){
        User user = userRepository.findUserByUserId(userPutDto.getUserId());
        if(userPutDto.getPassword() != null){
            user.setPassword(userPutDto.getPassword());
        }
        if(userPutDto.getProfile() != null){
            user.setProfile(userPutDto.getProfile());
        }
        if(userPutDto.getNickname() != null){
            user.setNickname(userPutDto.getNickname());
        }

        return new UserInfoDto(userRepository.save(user));
    }

    @Transactional
    public boolean changePoint(PointDto pointDto){
        User user = userRepository.findUserByUserId(pointDto.getUserId());
        if(user == null){                   // 잘못된 접근(유저 정보가 틀림)
            return false;
        }
        if(user.getLevel() == 0){           // 관리자로 접근(관리자는 포인트 변환이 안됨)
            return false;
        }
        Point point = new Point();
        point.setUserId(pointDto.getUserId());
        point.setPlusPoint(pointDto.getPlusPoint());
        point.setMinusPoint(pointDto.getMinusPoint());
        int crntPoint = user.getPoint() + point.getPlusPoint() - point.getMinusPoint(); // 현재 포인트 계산
        if(crntPoint < 0){                  // 차감될 포인트가 모자라면 안됨
            return false;
        }
        point.setCurrentPoint(crntPoint);
        point.setBreakdown(pointDto.getBreakdown());
        point.setDate(LocalDateTime.now());
        user.setPoint(crntPoint);
        user.setLevel(updateLevel(crntPoint));

        userRepository.save(user);
        pointRepository.save(point);

        return true;
    }

    private int updateLevel(int point){
        int result;
        if(point < bronzeTier){
            result = 1;
        }
        else if(point < angleTier){
            result = 2;
        }
        else if(point < godTier){
            result = 3;
        }
        else{
            result = 4;
        }
        return result;
    }

    @Transactional
    public List<Point> getPoint(String userId){
        List<Point> result = pointRepository.findAllByUserId(userId);
        Collections.reverse(result);
        return result;
    }

    @Transactional
    public List<UserInfoDto> findAll(){
        List<UserInfoDto> list = new ArrayList<>();
        userRepository.findAll().forEach(e -> list.add(new UserInfoDto(e)));
        return list;
    }

    @Transactional
    public User banUser(String userId){
        User user = userRepository.findUserByUserId(userId);
        user.setBanLevel(user.getBanLevel() + 1);
        return userRepository.save(user);
    }

    @Transactional
    public User registerAdmin(User user){
        user.setLevel(0);
        user.setPoint(0);
        user.setBanLevel(0);
        return userRepository.save(user);
    }

    public boolean verify(FindDto findDto){
        //TODO
        //실명인증 부분

        return true;
    }
}
