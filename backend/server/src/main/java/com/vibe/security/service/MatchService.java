package com.vibe.security.service;

import com.vibe.security.entity.MatchEntity;
import com.vibe.security.entity.UserEntity;
import com.vibe.security.repository.MatchRepository;
import com.vibe.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MatchService {

    private final MatchRepository matchRepo;
    private final UserRepository userRepo;

    @Transactional
    public boolean react(UUID currentUserId, UUID targetUserId, boolean liked) {

        if (currentUserId.equals(targetUserId)) {
            throw new IllegalArgumentException("Нельзя лайкать самого себя");
        }

        UserEntity source = userRepo.getReferenceById(currentUserId);
        UserEntity target = userRepo.getReferenceById(targetUserId);

        MatchEntity entity = matchRepo
                .findBySourceUserIdAndTargetUserId(currentUserId, targetUserId)
                .orElseGet(() -> MatchEntity.builder()
                        .sourceUser(source)
                        .targetUser(target)
                        .build());

        entity.setLiked(liked);
        matchRepo.save(entity);

        return matchRepo.existsBySourceUserIdAndTargetUserIdAndLikedTrue(targetUserId, currentUserId)
                && liked;
    }
}
