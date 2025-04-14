package com.vibe.security.controller;

import com.vibe.security.payload.AuthRequest;
import com.vibe.security.payload.AuthResponse;
import com.vibe.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request) {
        authService.register(request);
        return "User register successfully";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return authService.login(request);
    }

    @PostMapping("/refresh")
    public AuthResponse refresh(String refreshToken) {
        return authService.refresh(refreshToken);
    }

    @DeleteMapping("/logout")
    public String logout(String refreshToken) {
        authService.logout(refreshToken);
        return "Logout successfully";
    }
}
