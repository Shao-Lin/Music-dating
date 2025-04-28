package com.vibe.security.payload;

import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public record RegisterRequest(
        String name,
        String about,
        LocalDate birthDate,
        String city,
        String gender,
        String login,
        String password,
        MultipartFile image
) {
}
