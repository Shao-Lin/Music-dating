package com.vibe.security.service;

import com.vibe.security.entity.relational.UsageStat;
import com.vibe.security.repository.relational.UsageStatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DailyLimitService {

	public enum UsageType { RECOMMENDATION, TRACK_REGEN }

	private static final int DEFAULT_RECS   = 25;
	private static final int DEFAULT_TRACKS = 2;

	private final UsageStatRepository repo;

	@Transactional
	public void consume(UUID userId, UsageType type, boolean subscribed) {

		if (subscribed) return;

		LocalDate today = LocalDate.now();

		UsageStat stat = repo.findForUpdate(userId, today)
			.orElseGet(() -> new UsageStat(userId, DEFAULT_RECS, DEFAULT_TRACKS));

		switch (type) {
			case RECOMMENDATION -> {
				if (stat.getRecsLeft() == 0)
					throw limitExceeded("25 рекомендаций");
				stat.decRecs(5);
			}
			case TRACK_REGEN -> {
				if (stat.getTracksLeft() == 0)
					throw limitExceeded("2 генерации трека");
				stat.decTracks();
			}
		}
		repo.save(stat);
	}

	private ResponseStatusException limitExceeded(String msg) {
		return new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS,
			"Суточный лимит — " + msg);
	}
}
