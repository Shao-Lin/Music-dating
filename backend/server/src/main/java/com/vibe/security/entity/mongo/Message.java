package com.vibe.security.entity.mongo;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "messages")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {
	@Id
	private String id;
	@Indexed
	private String chatId;
	@Indexed
	private String senderId;

	private String text;

	private List<String> mediaUrls;

	@Indexed(direction = IndexDirection.ASCENDING)
	private Instant createdAt;
}