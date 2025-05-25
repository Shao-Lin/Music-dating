package com.vibe.security.service;

import com.vibe.security.config.S3ConfigurationProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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

    public List<String> uploadFiles(List<MultipartFile> files) throws IOException {
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            urls.add(upload(file));
        }

        return urls;
    }
}

