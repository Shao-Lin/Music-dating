package com.vibe.security.controller;

import com.vibe.security.entity.UserEntity;
import com.vibe.security.payload.TrackDto;
import com.vibe.security.payload.UserDto;
import com.vibe.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/me")
    public UserDto getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        UserEntity user = userRepository.findByUsername(userDetails.getUsername()).get();

        return new UserDto(
                user.getName(),
                user.getAbout(),
                user.getCity(),
                user.getGender(),
                user.getAvatarUrl(),
                user.getBirthDate(),
                user.getTracks().stream()
                        .map(trackEntity -> new TrackDto(trackEntity.getUrl(), "mock-name", "https://s3.twcstorage.ru/edafb68b-vibe-data/cover.jpg"))
                        .collect(Collectors.toSet())
        );
    }
}
