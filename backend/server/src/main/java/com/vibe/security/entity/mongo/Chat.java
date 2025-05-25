package com.vibe.security.entity.mongo;

import com.vibe.security.payload.MessagePreview;
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
import java.util.UUID;

@Document(collection = "chats")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Chat {
	@Id
	private String id;

	private List<UUID> participantIds;

	private MessagePreview lastMessage;

	@Indexed(direction = IndexDirection.DESCENDING)
	private Instant updatedAt;
}
