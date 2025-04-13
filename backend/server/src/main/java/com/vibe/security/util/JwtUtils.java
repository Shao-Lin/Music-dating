package com.vibe.security.util;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtils {

    private final SecretKey signingKey;

    @Value("${jwt.expiration-minutes}")
    private int jwtExpirationMinutes;

    @Value("${jwt.refresh-expiration-days}")
    private int jwtRefreshExpirationDays;

    public JwtUtils(@Value("${jwt.secret}") String secret) {
        // Генерируем ключ из секрета
        this.signingKey = mapToSecretKey(secret);
    }

    private static SecretKey mapToSecretKey(String jwtString) {
        return new SecretKeySpec(jwtString.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    }

    public String generateAccessToken(String username) {
        long now = System.currentTimeMillis();
        long expire = now + jwtExpirationMinutes * 60_000L;

        return Jwts.builder()
                .subject(username)
                .claim("roles", "USER")
                .issuedAt(new Date(now))
                .expiration(new Date(expire))
                .signWith(signingKey)
                .compact();
    }

    public String generateRefreshToken(String username) {
        long now = System.currentTimeMillis();
        long expire = now + jwtRefreshExpirationDays * 24 * 60 * 60_000L;

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date(now))
                .expiration(new Date(expire))
                .signWith(signingKey)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch(SecurityException | MalformedJwtException e) {
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        } catch (ExpiredJwtException e) {
            throw new AuthenticationCredentialsNotFoundException("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            throw new AuthenticationCredentialsNotFoundException("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            throw new AuthenticationCredentialsNotFoundException("JWT token compact of handler are invalid.");
        }
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }
}
