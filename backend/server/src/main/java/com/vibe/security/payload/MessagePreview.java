package com.vibe.security.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessagePreview {
	private String id;
	private String text;
	private Instant createdAt;
}
