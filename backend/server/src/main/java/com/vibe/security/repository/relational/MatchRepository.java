package com.vibe.security.repository.relational;

import com.vibe.security.entity.relational.MatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MatchRepository extends JpaRepository<MatchEntity, UUID> {

    Optional<MatchEntity> findBySourceUserIdAndTargetUserId(UUID sourceUserId, UUID targetUserId);

    boolean existsBySourceUserIdAndTargetUserIdAndLikedTrue(UUID sourceUserId, UUID targetUserId);
}
