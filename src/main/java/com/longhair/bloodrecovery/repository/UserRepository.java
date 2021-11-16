package com.longhair.bloodrecovery.repository;

import com.longhair.bloodrecovery.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUserId(String userId);
    User findUserByNickname(String nickname);
    User findUserByNameAndPersonalNumber(String name, String personalNumber);
    void deleteUserByUserId(String userId);
    List<User> findUsersByName(String name);
}
