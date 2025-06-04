package com.vibe.security.mapper;

import com.vibe.security.entity.relational.*;
import com.vibe.security.payload.*;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class UserMapper {


	public UserDto toDto(UserEntity e) {
		return new UserDto(
			e.getId(),
			e.getName(),
			e.getAbout(),
			e.getCity(),
			e.getGender(),
			e.getAvatarUrl(),
			e.getBirthDate(),
			e.getTracks().stream()
				.sorted(Comparator.comparing(TrackEntity::getId))
				.map(t -> new TrackDto(
					t.getId(),
					t.getUrl(),
					t.getName(),
					t.getCoverUrl(),
					t.getIsMain()))
				.collect(Collectors.toCollection(LinkedHashSet::new)),
			e.getPhotos().stream()
				.map(p -> new UserPhotoDto(p.getId(), p.getUrl()))
				.collect(Collectors.toSet())
		);
	}


	public UserEntity toEntity(UserDto d) {
		return UserEntity.builder()
			.id(d.userId() != null ? d.userId() : UUID.randomUUID())
			.name(d.name())
			.about(d.about())
			.city(d.city())
			.gender(d.gender())
			.avatarUrl(d.avatarUrl())
			.birthDate(d.birthDate())
			.tracks(
				d.tracks().stream()
					.map(this::trackFromDto)
					.collect(Collectors.toSet()))
			.photos(
				d.photos().stream()
					.map(this::photoFromDto)
					.collect(Collectors.toSet()))
			.build();
	}

	public void updateEntity(UserEntity e, UserDto d) {
		if (d.name() != null) e.setName(d.name());
		if (d.about() != null) e.setAbout(d.about());
		if (d.city() != null) e.setCity(d.city());
		if (d.gender() != null) e.setGender(d.gender());
		if (d.avatarUrl() != null) e.setAvatarUrl(d.avatarUrl());
		if (d.birthDate() != null) e.setBirthDate(d.birthDate());
	}


	private TrackEntity trackFromDto(TrackDto t) {
		return TrackEntity.builder()
			.url(t.url())
			.name(t.name())
			.coverUrl(t.coverUrl())
			.build();
	}

	private UserPhotoEntity photoFromDto(UserPhotoDto p) {
		return UserPhotoEntity.builder()
			.id(p.photoId() != null ? p.photoId() : UUID.randomUUID())
			.url(p.url())
			.build();
	}
}
