package com.vibe.security.controller;

import com.vibe.security.entity.UserEntity;
import com.vibe.security.mapper.UserMapper;
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
    private final UserMapper userMapper;

    @GetMapping("/me")
    public UserDto getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        UserEntity user = userRepository.findByUsername(userDetails.getUsername()).get();
        return userMapper.toDto(user);
    }
}
