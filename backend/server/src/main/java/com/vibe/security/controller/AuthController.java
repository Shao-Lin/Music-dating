package com.vibe.security.controller;

import com.vibe.security.payload.AuthRequest;
import com.vibe.security.payload.AuthResponse;
import com.vibe.security.payload.RegisterRequest;
import com.vibe.security.service.AuthService;
import com.vibe.security.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    private final OtpService otp;


    @PostMapping("/register")
    public String register(@ModelAttribute RegisterRequest request) {
        authService.register(request);
        return "User register successfully";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return authService.login(request);
    }

    @PostMapping("/refresh")
    public AuthResponse refresh(@RequestHeader("Authorization") String refreshToken) {
        return authService.refresh(refreshToken);
    }

    @DeleteMapping("/logout")
    public String logout(String refreshToken) {
        authService.logout(refreshToken);
        return "Logout successfully";
    }

    @PostMapping("/request-code")
    public ResponseEntity<Void> requestCode(@RequestParam(name = "email") String email) {
        otp.sendCode(email.toLowerCase(Locale.ROOT));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verify(@RequestParam(name = "email") String email,
                                    @RequestParam(name = "code") String code) {
        boolean ok = otp.verify(email.toLowerCase(Locale.ROOT), code);
        return ok ? ResponseEntity.ok().build()
                : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid code");
    }
}
