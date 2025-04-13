package com.vibe.security.service;

import com.vibe.security.entity.RefreshTokenEntity;
import com.vibe.security.entity.RoleEntity;
import com.vibe.security.entity.UserEntity;
import com.vibe.security.exception.InvalidPasswordException;
import com.vibe.security.exception.RefreshTokenException;
import com.vibe.security.exception.UserAlreadyExistsException;
import com.vibe.security.repository.RefreshTokenRepository;
import com.vibe.security.repository.RoleRepository;
import com.vibe.security.repository.UserRepository;
import com.vibe.security.payload.AuthRequest;
import com.vibe.security.payload.AuthResponse;
import com.vibe.security.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
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

    @Override
    public void register(AuthRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new UserAlreadyExistsException(USER_ALREADY_EXISTS);
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(request.username());
        userEntity.setPassword(passwordEncoder.encode(request.password()));
        Optional<RoleEntity> role = roleRepository.findByName("USER");
        userEntity.setRoles(Set.of(new RoleEntity[]{role.get()}));
        userRepository.save(userEntity);
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        String username = request.username();
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
