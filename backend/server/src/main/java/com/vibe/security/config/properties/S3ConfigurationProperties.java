package com.vibe.security.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cloud.s3")
@Getter
@Setter
public class S3ConfigurationProperties {
    private String endpoint;
    private String region;
    private String accessKey;
    private String secretKey;
    private String bucket;
}
