package com.vibe.security.payload;

public record SunoGeneratePrompt(String prompt,
                                 String style,
                                 String title,
                                 Boolean customMode,
                                 Boolean instrumental,
                                 String model,
                                 String negativeTags,
                                 String callBackUrl) {
}
