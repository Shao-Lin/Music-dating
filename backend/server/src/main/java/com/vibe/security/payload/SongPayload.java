package com.vibe.security.payload;

public record SongPayload(
        String id,
        String audioUrl,
        String streamAudioUrl,
        String imageUrl,
        Double duration,
        String modelName,
        String title,
        String prompt) {}
