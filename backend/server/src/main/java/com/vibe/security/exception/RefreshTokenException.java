package com.vibe.security.exception;

public class RefreshTokenException extends RuntimeException {
    public RefreshTokenException(ExceptionMessage message) {
        super(message.getMessage());
    }
}
