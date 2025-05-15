package com.vibe.security.mapper;

import com.vibe.security.entity.UserEntity;
import com.vibe.security.payload.TrackDto;
import com.vibe.security.payload.UserDto;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {
    public UserDto toDto(UserEntity userEntity) {
        return new UserDto(
                userEntity.getId(),
                userEntity.getName(),
                userEntity.getAbout(),
                userEntity.getCity(),
                userEntity.getGender(),
                userEntity.getAvatarUrl(),
                userEntity.getBirthDate(),
                userEntity.getTracks().stream()
                        .map(trackEntity -> new TrackDto(trackEntity.getUrl(), "mock-name", "https://s3.twcstorage.ru/edafb68b-vibe-data/cover.jpg"))
                        .collect(Collectors.toSet())
        );
    }
}
