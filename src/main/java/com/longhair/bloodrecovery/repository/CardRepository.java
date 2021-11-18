package com.longhair.bloodrecovery.repository;

import com.longhair.bloodrecovery.domain.Card;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    Card findCardByCode(String code);
    List<Card> findByUserid(String userid);
}
