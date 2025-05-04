package com.vibe.security.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class OtpService {
    private static final SecureRandom RND = new SecureRandom();
    private final MailService mail;
    private final CacheManager cacheManager;

    public void sendCode(String email) {
        String code = String.format("%04d", RND.nextInt(10_000));

        cacheManager.getCache("otp").put(email, code);
        mail.sendOtp(email, code);
    }

    public boolean verify(String email, String code) {
        Cache cacheOtp = cacheManager.getCache("otp");
        String cached = cacheOtp.get(email, String.class);

        if (code.equals(cached)) {
            cacheOtp.evict(email);
            return true;
        }
        return false;
    }
}

