package com.vibe.security.payload;

import java.util.List;
import java.util.UUID;

public record CreateChatRequest(List<UUID> participants) {
}
