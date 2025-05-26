package com.vibe.security.repository.relational;

import com.vibe.security.entity.relational.UserPhotoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserPhotoRepository extends JpaRepository<UserPhotoEntity, UUID> {}
