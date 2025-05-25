package com.vibe.security.repository.mongo;

import com.vibe.security.entity.mongo.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChatRepository extends MongoRepository<Chat, String> {
	List<Chat> findByParticipantIdsContainsOrderByUpdatedAtDesc(UUID userId);

	@Query("{ 'participantIds': { $all: ?0 } }")
	Optional<Chat> findByParticipants(List<UUID> ids);
}
