package com.vibe.security.service;

import com.vibe.security.entity.RefreshTokenEntity;
import com.vibe.security.entity.RoleEntity;
import com.vibe.security.entity.TrackEntity;
import com.vibe.security.entity.UserEntity;
import com.vibe.security.exception.InvalidPasswordException;
import com.vibe.security.exception.RefreshTokenException;
import com.vibe.security.exception.UserAlreadyExistsException;
import com.vibe.security.payload.RegisterRequest;
import com.vibe.security.repository.RefreshTokenRepository;
import com.vibe.security.repository.RoleRepository;
import com.vibe.security.repository.TrackRepository;
import com.vibe.security.repository.UserRepository;
import com.vibe.security.payload.AuthRequest;
import com.vibe.security.payload.AuthResponse;
import com.vibe.security.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.vibe.security.exception.ExceptionMessage.*;

@Service
@RequiredArgsConstructor
public class DefaultAuthService implements AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final RoleRepository roleRepository;
    private final S3StorageService s3StorageService;
    private final TrackRepository trackRepository;

    @Override
    public void register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.login())) {
            throw new UserAlreadyExistsException(USER_ALREADY_EXISTS);
        }

        //TODO - использовать мапстракт
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(request.login());
        userEntity.setPassword(passwordEncoder.encode(request.password()));
        Optional<RoleEntity> role = roleRepository.findByName("USER");
        userEntity.setRoles(Set.of(new RoleEntity[]{role.get()}));

        userEntity.setAbout(request.about());
        userEntity.setCity(request.city());
        userEntity.setName(request.name());
        userEntity.setBirthDate(request.birthDate());
        userEntity.setGender(request.gender());
        try {
            userEntity.setAvatarUrl(s3StorageService.upload(request.image()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        UserEntity savedUser = userRepository.save(userEntity);

        // mock
        TrackEntity trackEntityFirst = TrackEntity.builder()
                .url("https://s3.twcstorage.ru/edafb68b-vibe-data/frozen_time.mp3")
                .user(savedUser)
                .build();
        //mock
        TrackEntity trackEntitySecond = TrackEntity.builder()
                .url("https://s3.twcstorage.ru/edafb68b-vibe-data/reflect.mp3")
                .user(savedUser)
                .build();

        trackRepository.saveAll(List.of(trackEntityFirst, trackEntitySecond));
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        String username = request.login();
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException(USER_NOT_FOUND.getMessage()));

        if (!passwordEncoder.matches(request.password(), userEntity.getPassword())) {
            throw new InvalidPasswordException(INVALID_PASSWORD);
        }

        String accessToken = jwtUtils.generateAccessToken(username);
        String refreshToken = jwtUtils.generateRefreshToken(username);

        Date expiration = jwtUtils.extractAllClaims(refreshToken).getExpiration();
        LocalDateTime expLocal = Instant.ofEpochMilli(expiration.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();

        RefreshTokenEntity tokenEntity = new RefreshTokenEntity();
        tokenEntity.setTokenValue(refreshToken);
        tokenEntity.setUsername(username);
        tokenEntity.setExpiry(expLocal);

        refreshTokenRepository.save(tokenEntity);

        return new AuthResponse(accessToken, refreshToken);
    }

    @Override
    public AuthResponse refresh(String refreshToken) {
        if (jwtUtils.validateToken(refreshToken)) {
            throw new RefreshTokenException(INVALID_TOKEN);
        }
        RefreshTokenEntity tokenEntity = refreshTokenRepository.findByTokenValue(refreshToken);
        if (tokenEntity == null) {
            throw new RefreshTokenException(TOKEN_NOT_FOUND);
        }
        if(tokenEntity.isExpired()) {
            throw new RefreshTokenException(TOKEN_EXPIRED);
        }

        String username = jwtUtils.extractUsername(refreshToken);
        String newAccessToken = jwtUtils.generateAccessToken(username);

        return new AuthResponse(newAccessToken, refreshToken);
    }

    @Override
    public void logout(String refreshToken) {
        refreshTokenRepository.deleteByTokenValue(refreshToken);
    }
}
