package com.vibe.security.payload;

import java.time.LocalDate;
import java.util.Set;

public record UserDto(
        String name,
        String about,
        String city,
        String gender,
        String avatarUrl,
        LocalDate birthDate,
        Set<TrackDto> tracks
) {
}
