package com.vibe.security.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "suno")
public class SunoConfigurationProperties {
    private String baseUrl;
    private String apiKey;
}
