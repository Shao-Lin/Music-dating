package com.vibe.security.service;

import com.vibe.security.payload.AuthRequest;
import com.vibe.security.payload.AuthResponse;
import com.vibe.security.payload.RegisterRequest;

public interface AuthService {
    void register(RegisterRequest request);
    AuthResponse login(AuthRequest request);
    AuthResponse refresh(String refreshToken);
    void logout(String refreshToken);
}
