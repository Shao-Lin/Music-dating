package com.vibe.security.service;

import com.vibe.security.entity.relational.UserEntity;
import com.vibe.security.entity.relational.UserSettingEntity;
import com.vibe.security.payload.UserSettingDto;
import com.vibe.security.repository.relational.UserRepository;
import com.vibe.security.repository.relational.UserSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserSettingService {

	private final UserRepository userRepo;
	private final UserSettingRepository settingRepo;

	@Transactional(readOnly = true)
	public UserSettingDto get(UserEntity userEntity) {
		UserSettingEntity e = settingRepo.findByUser(userEntity)
			.orElseThrow();
		return toDto(e);
	}

	@Transactional
	public void put(UserEntity userEntity, UserSettingDto dto) {
		UserSettingEntity e = settingRepo.findByUser(userEntity)
			.orElseThrow();

		if (dto.lang() != null) e.setLang(dto.lang());
		if (dto.ageFrom() != null) e.setAgeFrom(dto.ageFrom());
		if (dto.ageTo() != null) e.setAgeTo(dto.ageTo());
		if (dto.autoplay() != null) e.setAutoplay(dto.autoplay());
	}

	@Transactional
	public void buyMonthly(UserEntity userEntity) {
		UserSettingEntity e = settingRepo.findByUser(userEntity)
			.orElseGet(() -> {
				UserEntity u = userRepo.findById(userEntity.getId()).orElseThrow();
				return settingRepo.save(UserSettingEntity.builder()
					.user(u).build());
			});

		LocalDate from = LocalDate.now();
		LocalDate to = from.plusMonths(1);

		e.setSubActive(true);
		e.setActiveFrom(from);
		e.setActiveTo(to);
	}

	private static UserSettingDto toDto(UserSettingEntity e) {
		return new UserSettingDto(
			e.getLang(),
			e.getAgeFrom(),
			e.getAgeTo(),
			e.getSubActive(),
			e.getActiveFrom(),
			e.getActiveTo(),
			e.getAutoplay());
	}
}
