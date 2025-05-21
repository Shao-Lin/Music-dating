package com.vibe.security.repository;

import com.vibe.security.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    Optional<UserEntity> findByUsername(String username);

    boolean existsByUsername(String username);

    @Query("""
        SELECT u FROM UserEntity u
        WHERE u.id <> :currentUserId and u.gender <> :gender
          AND u.id NOT IN (
              SELECT m.targetUser.id
              FROM MatchEntity m
              WHERE m.sourceUser.id = :currentUserId
          )
        """)
    Page<UserEntity> findUnseenUsers(@Param("currentUserId") UUID currentUserId,
                                     String gender,
                                     Pageable pageable);

    @Query("""
        SELECT u
        FROM UserEntity u
        WHERE u.id IN (
            SELECT m1.targetUser.id
            FROM MatchEntity m1
            WHERE m1.sourceUser.id = :currentUserId
              AND m1.liked = TRUE
              AND EXISTS (
                  SELECT 1
                  FROM MatchEntity m2
                  WHERE m2.sourceUser.id = m1.targetUser.id
                    AND m2.targetUser.id = :currentUserId
                    AND m2.liked = TRUE
              )
        )
        """)
    Set<UserEntity> findMutualMatches(@Param("currentUserId") UUID currentUserId);

    @Query("""
                SELECT m.sourceUser
                FROM MatchEntity m
                WHERE m.targetUser.id = :currentUserId
                  AND m.liked = TRUE
                  AND NOT EXISTS (
                      SELECT 1
                      FROM MatchEntity m2
                      WHERE m2.sourceUser.id = :currentUserId
                        AND m2.targetUser.id = m.sourceUser.id
                  )
            """)
    Set<UserEntity> findIncomingLikes(@Param("currentUserId") UUID currentUserId);

}
