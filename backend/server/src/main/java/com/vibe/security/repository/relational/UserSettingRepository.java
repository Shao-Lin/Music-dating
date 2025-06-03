package com.vibe.security.repository.relational;

import com.vibe.security.entity.relational.UserEntity;
import com.vibe.security.entity.relational.UserSettingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserSettingRepository extends JpaRepository<UserSettingEntity, UUID> {
    Optional<UserSettingEntity> findByUser(UserEntity user);
}
