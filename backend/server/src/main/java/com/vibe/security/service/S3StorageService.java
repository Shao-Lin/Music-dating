package com.vibe.security.service;

import com.vibe.security.config.properties.S3ConfigurationProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3StorageService {

    private final S3Client s3;
    private final S3ConfigurationProperties props;

    public String upload(MultipartFile file) throws IOException {

        String key = UUID.randomUUID() + "-" + Objects.requireNonNull(file.getOriginalFilename());


        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(props.getBucket())
                .key(key)
                .contentType(file.getContentType())
                .build();
        s3.putObject(
                request,
                RequestBody.fromBytes(file.getBytes())
        );

        return props.getEndpoint() + "/" + props.getBucket() + "/" + key;
    }

    public String uploadResource(Resource file, MediaType contentType) throws IOException {

        String key = UUID.randomUUID() + "-" + Objects.requireNonNull(file.getFilename());


        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(props.getBucket())
                .key(key)
                .contentType(contentType.getType())
                .build();
        s3.putObject(
                request,
                RequestBody.fromBytes(file.getInputStream().readAllBytes())
        );

        return props.getEndpoint() + "/" + props.getBucket() + "/" + key;
    }

    public void cutAudio(Resource audio) {
        
    }
}

