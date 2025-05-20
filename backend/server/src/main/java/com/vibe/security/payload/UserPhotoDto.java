package com.vibe.security.payload;

import java.util.UUID;

public record UserPhotoDto(UUID photoId, String url) {
}
