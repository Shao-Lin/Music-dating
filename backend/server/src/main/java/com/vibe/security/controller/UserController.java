package com.vibe.security.controller;

import com.vibe.security.entity.UserEntity;
import com.vibe.security.mapper.UserMapper;
import com.vibe.security.payload.UserDto;
import com.vibe.security.repository.UserRepository;
import com.vibe.security.service.UserPhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

//FIXME в userDetails хранить userId или повесить btree на username
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserPhotoService userPhotoService;

    @GetMapping("/me")
    public UserDto getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        UserEntity user = userRepository.findByUsername(userDetails.getUsername()).get();
        return userMapper.toDto(user);
    }

    @PostMapping("/upload-photo")
    public void uploadPhoto(@AuthenticationPrincipal UserDetails userDetails, @RequestPart MultipartFile photo) throws IOException {
        UUID userId = userRepository.findByUsername(userDetails.getUsername()).get().getId();
        userPhotoService.upload(userId, photo);
    }

    @DeleteMapping("/{photo-id}/delete-photo")
    public ResponseEntity<Void> deletePhoto(@AuthenticationPrincipal UserDetails userDetails, @PathVariable("photo-id") UUID photoId) {
        UUID userId = userRepository.findByUsername(userDetails.getUsername()).get().getId();
        userPhotoService.delete(userId, photoId);
        return ResponseEntity.noContent().build();
    }
}
