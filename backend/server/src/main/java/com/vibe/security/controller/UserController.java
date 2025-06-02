package com.vibe.security.controller;

import com.vibe.security.entity.relational.TrackEntity;
import com.vibe.security.entity.relational.UserEntity;
import com.vibe.security.mapper.UserMapper;
import com.vibe.security.payload.UserDto;
import com.vibe.security.payload.UserSettingDto;
import com.vibe.security.repository.relational.TrackRepository;
import com.vibe.security.repository.relational.UserRepository;
import com.vibe.security.service.DefaultAuthService;
import com.vibe.security.service.S3StorageService;
import com.vibe.security.service.UserPhotoService;
import com.vibe.security.service.UserSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

//FIXME в userDetails хранить userId или повесить btree на username
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserPhotoService userPhotoService;
    private final S3StorageService s3StorageService;
    private final UserSettingService userSettingService;
    private final DefaultAuthService defaultAuthService;
    private final TrackRepository trackRepository;

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

    @PatchMapping("/edit-avatar")
    public void editAvatar(@AuthenticationPrincipal UserDetails userDetails, @RequestPart MultipartFile avatar) throws IOException {
        UserEntity userEntity = userRepository.findByUsername(userDetails.getUsername()).get();
        String url = s3StorageService.upload(avatar);
        userEntity.setAvatarUrl(url);
        userRepository.save(userEntity);
    }

    @GetMapping("/settings")
    public UserSettingDto getSettings(@AuthenticationPrincipal UserDetails ud) {
        UserEntity user = userRepository.findByUsername(ud.getUsername()).get();
        return userSettingService.get(user);
    }

    @PutMapping("/settings")
    public void updateSettings(@AuthenticationPrincipal UserDetails ud,
                               @RequestBody UserSettingDto body) {
        UserEntity user = userRepository.findByUsername(ud.getUsername()).get();
        userSettingService.put(user, body);
    }

    @PostMapping("/buy-sub")
    public void buySubscription(@AuthenticationPrincipal UserDetails ud) {
        UserEntity user = userRepository.findByUsername(ud.getUsername()).get();
        userSettingService.buyMonthly(user);
    }

    @PutMapping("/edit-profile")
    public void editProfile(@AuthenticationPrincipal UserDetails ud,
                            @RequestBody UserDto userDto) {
        UserEntity user = userRepository.findByUsername(ud.getUsername()).get();
        userMapper.updateEntity(user, userDto);
        userRepository.save(user);
    }

    @PatchMapping("/regenerate-track")
    public void regenerateTrack(@AuthenticationPrincipal UserDetails ud) {
        UserEntity user = userRepository.findByUsername(ud.getUsername()).get();
        defaultAuthService.generateMusic(user.getAbout(), user);
    }

    @PatchMapping("/{track-id}")
    public void setMainTrack(@AuthenticationPrincipal UserDetails ud, @PathVariable(name = "track-id") UUID trackId) {
        UserEntity user = userRepository.findByUsername(ud.getUsername()).get();
        List<TrackEntity> trackEntitiesByUser = trackRepository.findTrackEntitiesByUser(user);
        for (TrackEntity trackEntity : trackEntitiesByUser) {
            if (trackId.equals(trackEntity.getId())) {
                trackEntity.setIsMain(Boolean.TRUE);
                continue;
            }
            trackEntity.setIsMain(Boolean.FALSE);
        }
        trackRepository.saveAll(trackEntitiesByUser);
    }
}
