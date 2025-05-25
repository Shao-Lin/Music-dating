package com.vibe.security.repository.relational;

import com.vibe.security.entity.relational.TrackEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TrackRepository extends JpaRepository<TrackEntity, UUID> {
    Optional<TrackEntity> findByUserId(UUID userId);
}
