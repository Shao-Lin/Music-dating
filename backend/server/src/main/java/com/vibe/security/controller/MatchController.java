package com.vibe.security.controller;

import com.vibe.security.payload.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class MatchController {
    @GetMapping
    public Set<UserDto> getUnusedUsers(@AuthenticationPrincipal UserDetails userDetails) {

    }
}
