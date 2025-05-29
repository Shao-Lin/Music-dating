package com.vibe.security.service;

import com.vibe.security.entity.mongo.Chat;
import com.vibe.security.entity.mongo.Message;
import com.vibe.security.payload.MessagePreview;
import com.vibe.security.repository.mongo.ChatRepository;
import com.vibe.security.repository.mongo.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ChatService {

	private final ChatRepository chatRepo;
	private final MessageRepository msgRepo;
	private final SimpMessagingTemplate ws;

	public Message send(String chatId, String senderId,
											String text, List<String> mediaUrls) {

		Message msg = msgRepo.save(Message.builder()
			.chatId(chatId).senderId(senderId)
			.text(text).mediaUrls(mediaUrls)
			.createdAt(Instant.now())
			.build());

		chatRepo.findById(chatId).ifPresent(chat -> {
			chat.setLastMessage(new MessagePreview(
				msg.getId(),
				text == null || text.isEmpty() ? "File" : text,
				msg.getCreatedAt()));
			chat.setUpdatedAt(msg.getCreatedAt());
			chatRepo.save(chat);
		});

		ws.convertAndSend("/topic/chat/" + chatId, msg);
		return msg;
	}

	public Chat create(List<UUID> participants) {
		Chat chat = Chat.builder()
			.participantIds(participants)
			.updatedAt(Instant.now())
			.build();

		return chatRepo.save(chat);
	}
}
