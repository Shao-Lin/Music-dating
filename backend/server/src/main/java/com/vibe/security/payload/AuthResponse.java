package com.vibe.security.payload;

public record AuthResponse(String accessToken, String refreshToken) {
}
