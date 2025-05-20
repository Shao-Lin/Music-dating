package com.vibe.security.payload;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

public record UserDto(
        UUID userId,
        String name,
        String about,
        String city,
        String gender,
        String avatarUrl,
        LocalDate birthDate,
        Set<TrackDto> tracks,
        Set<UserPhotoDto> photos
) {
}
