package com.vibe.security.repository.mongo;

import com.vibe.security.entity.mongo.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface ChatRepository extends MongoRepository<Chat, String> {
	List<Chat> findByParticipantIdsContainsOrderByUpdatedAtDesc(UUID userId);
}
