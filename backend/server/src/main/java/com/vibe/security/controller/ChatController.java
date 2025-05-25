package com.vibe.security.controller;

import com.vibe.security.entity.mongo.Chat;
import com.vibe.security.entity.mongo.Message;
import com.vibe.security.payload.CreateChatRequest;
import com.vibe.security.repository.mongo.ChatRepository;
import com.vibe.security.repository.mongo.MessageRepository;
import com.vibe.security.repository.relational.UserRepository;
import com.vibe.security.service.ChatService;
import com.vibe.security.service.S3StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.annotations.NotNull;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

	private final ChatRepository chatRepo;
	private final MessageRepository msgRepo;
	private final ChatService chatService;
	private final S3StorageService s3StorageService;
	private final UserRepository userRepository;

	@PostMapping
	public Chat create(@AuthenticationPrincipal UserDetails userDetails,
										 @RequestBody @NotNull CreateChatRequest request) {
		List<UUID> participants = request.participants();
		participants.add(userRepository.findByUsername(userDetails.getUsername()).get().getId());
		return chatService.create(request.participants());
	}

	@GetMapping("/{target-id}")
	public Chat getChatByTargetId(@AuthenticationPrincipal UserDetails me,
									@PathVariable("target-id") UUID targetId) {

		UUID myId = userRepository.findByUsername(me.getUsername())
			.orElseThrow()
			.getId();

		return chatRepo.findByParticipants(List.of(myId, targetId))
			.orElseThrow(() ->
				new ResponseStatusException(HttpStatus.NOT_FOUND,
					"Chat not found"));
	}

	@GetMapping
	public List<Chat> myChats(@AuthenticationPrincipal UserDetails userDetails) {
		UUID userId = userRepository.findByUsername(userDetails.getUsername()).get().getId();
		return chatRepo.findByParticipantIdsContainsOrderByUpdatedAtDesc(userId);
	}

	@GetMapping("/{chat-id}/messages")
	public Page<Message> history(@PathVariable("chat-id") String chatId,
															 @RequestParam(defaultValue = "0") int page,
															 @RequestParam(defaultValue = "30") int size) {
		return msgRepo.findByChatIdOrderByCreatedAtDesc(chatId, PageRequest.of(page, size));
	}

	@PostMapping("/{chat-id}/messages")
	public Message send(@PathVariable("chat-id") String chatId,
											@AuthenticationPrincipal UserDetails userDetails,
											@RequestPart(required = false) String text,
											@RequestPart(required = false) List<MultipartFile> files) throws IOException {
		List<String> urls = new ArrayList<>();
		if (files != null && !files.isEmpty()) {
			urls = s3StorageService.uploadFiles(files);
		}
		return chatService.send(chatId, userDetails.getUsername(), text, urls);
	}
}

