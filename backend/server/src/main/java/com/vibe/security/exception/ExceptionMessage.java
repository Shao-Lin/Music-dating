package com.vibe.security.exception;

import lombok.Getter;

@Getter
public enum ExceptionMessage {

    USER_ALREADY_EXISTS("User with this username already exists"),
    USER_NOT_FOUND("User with this username doesnt exist"),
    INVALID_PASSWORD("Invalid password"),
    INVALID_TOKEN("Invalid or expired token"),
    TOKEN_NOT_FOUND("Token not found"),
    TOKEN_EXPIRED("Token is expired");

    private final String message;

    ExceptionMessage(String message) {
        this.message = message;
    }
}
