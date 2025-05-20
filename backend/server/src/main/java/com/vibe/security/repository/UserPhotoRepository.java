package com.vibe.security.repository;

import com.vibe.security.entity.UserPhotoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserPhotoRepository extends JpaRepository<UserPhotoEntity, UUID> {}
