package com.vibe.security.repository.mongo;

import com.vibe.security.entity.mongo.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
	Page<Message> findByChatIdOrderByCreatedAtDesc(String chatId, Pageable pageable);
}
