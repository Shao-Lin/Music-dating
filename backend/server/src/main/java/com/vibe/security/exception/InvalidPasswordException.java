package com.vibe.security.exception;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException(ExceptionMessage message) {
        super(message.getMessage());
    }
}
