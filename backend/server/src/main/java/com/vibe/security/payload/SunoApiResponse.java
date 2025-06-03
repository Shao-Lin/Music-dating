package com.vibe.security.payload;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SunoApiResponse<T>(int code, String msg, T data) {}
