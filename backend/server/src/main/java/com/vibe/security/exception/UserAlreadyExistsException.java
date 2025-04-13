package com.vibe.security.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(ExceptionMessage message) {
        super(message.getMessage());
    }
}
