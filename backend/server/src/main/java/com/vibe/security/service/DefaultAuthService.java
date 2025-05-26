package com.vibe.security.service;

import com.vibe.security.entity.RefreshTokenEntity;
import com.vibe.security.entity.RoleEntity;
import com.vibe.security.entity.TrackEntity;
import com.vibe.security.entity.UserEntity;
import com.vibe.security.exception.InvalidPasswordException;
import com.vibe.security.exception.RefreshTokenException;
import com.vibe.security.exception.UserAlreadyExistsException;
import com.vibe.security.payload.*;
import com.vibe.security.repository.RefreshTokenRepository;
import com.vibe.security.repository.RoleRepository;
import com.vibe.security.repository.TrackRepository;
import com.vibe.security.repository.UserRepository;
import com.vibe.security.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.vibe.security.exception.ExceptionMessage.*;

@Slf4j
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
    private final SunoBlockingService sunoBlockingService;
    private final AudioTrimService audioTrimService;
    private final RestClient restClient = RestClient.builder()
            .defaultHeader(HttpHeaders.ACCEPT, MediaType.ALL_VALUE)
            .build();

    @Override
    @Transactional
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

        try {
            RecordInfoResponse result = sunoBlockingService.generateAndWait(new SunoGeneratePrompt(
                    request.about(),
                    "",
                    "",
                    Boolean.FALSE,
                    Boolean.FALSE,
                    "V3_5",
                    "",
                    ""));

            log.info("Музыка сгенерирована нейросетью и получена");

            List<SongPayload> songPayloads = result.songList();

            SongPayload track1 = songPayloads.getFirst();
            SongPayload track2 = songPayloads.getLast();


            ResponseEntity<Resource> track1Audio = restClient.get()
                    .uri(track1.audioUrl())
                    .retrieve()
                    .toEntity(Resource.class);

            ResponseEntity<Resource> track2Audio = restClient.get()
                    .uri(track2.audioUrl())
                    .retrieve()
                    .toEntity(Resource.class);

            ResponseEntity<Resource> track1Image = restClient.get()
                    .uri(track1.imageUrl())
                    .retrieve()
                    .toEntity(Resource.class);

            ResponseEntity<Resource> track2Image = restClient.get()
                    .uri(track1.imageUrl())
                    .retrieve()
                    .toEntity(Resource.class);

            log.info("Получены файлы картинок и треков mp3 с хранилища апи нейронки");

            TrackEntity trackEntityFirst = TrackEntity.builder()
                    .url(s3StorageService.uploadResource(audioTrimService.trimFirst20sToResource(track1Audio.getBody()), track1Audio.getHeaders().getContentType()))
                    .user(savedUser)
                    .coverUrl(s3StorageService.uploadResource(track1Image.getBody(), track1Image.getHeaders().getContentType()))
                    .name(track1.title())
                    .build();

            TrackEntity trackEntitySecond = TrackEntity.builder()
                    .url(s3StorageService.uploadResource(audioTrimService.trimFirst20sToResource(track2Audio.getBody()), track2Audio.getHeaders().getContentType()))
                    .user(savedUser)
                    .coverUrl(s3StorageService.uploadResource(track2Image.getBody(), track2Image.getHeaders().getContentType()))
                    .name(track2.title())
                    .build();

            log.info("Треки загружены в внутреннее хранилище");

            trackRepository.saveAll(List.of(trackEntityFirst, trackEntitySecond));
        } catch (InterruptedException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
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
        jwtUtils.validateToken(refreshToken);

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
