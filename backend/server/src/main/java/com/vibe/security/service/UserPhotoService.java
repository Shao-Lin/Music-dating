package com.vibe.security.service;

import com.vibe.security.entity.relational.UserEntity;
import com.vibe.security.entity.relational.UserPhotoEntity;
import com.vibe.security.repository.relational.UserPhotoRepository;
import com.vibe.security.repository.relational.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserPhotoService {

    private final S3StorageService storage;
    private final UserRepository userRepo;
    private final UserPhotoRepository photoRepo;

    @Transactional
    public UserPhotoEntity upload(UUID userId, MultipartFile file) throws IOException {
        UserEntity user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String url = storage.upload(file);

        UserPhotoEntity photo = UserPhotoEntity.builder()
                .url(url)
                .user(user)
                .build();

        user.getPhotos().add(photo);
        return photoRepo.save(photo);
    }

    @Transactional
    public void delete(UUID userId, UUID photoId) {
        UserPhotoEntity photo = photoRepo.findById(photoId)
                .orElseThrow(() -> new IllegalArgumentException("Photo not found"));

        if (!photo.getUser().getId().equals(userId)) {
            throw new IllegalStateException("Photo does not belong to user");
        }

        photo.getUser().getPhotos().remove(photo);
        photoRepo.delete(photo);
    }
}
