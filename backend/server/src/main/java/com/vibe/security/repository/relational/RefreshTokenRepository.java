package com.vibe.security.repository.relational;

import com.vibe.security.entity.relational.RefreshTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, UUID> {

    RefreshTokenEntity findByTokenValue(String tokenValue);

    void deleteByTokenValue(String tokenValue);
}

