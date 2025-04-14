package com.vibe.security.service;

import com.vibe.security.payload.AuthRequest;
import com.vibe.security.payload.AuthResponse;

public interface AuthService {
    void register(AuthRequest request);
    AuthResponse login(AuthRequest request);
    AuthResponse refresh(String refreshToken);
    void logout(String refreshToken);
}
