package com.vibe.security.entity.relational;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "usage_stat")
@Getter @Setter @NoArgsConstructor
public class UsageStat {

	@EmbeddedId
	private UsageStatId id;

	@Column(name = "recs_left",   nullable = false)
	private int recsLeft;

	@Column(name = "tracks_left", nullable = false)
	private int tracksLeft;

	public UsageStat(UUID userId, int recsLeft, int tracksLeft) {
		this.id       = new UsageStatId(userId, java.time.LocalDate.now());
		this.recsLeft = recsLeft;
		this.tracksLeft = tracksLeft;
	}

	public void decRecs(int count)   { this.recsLeft = this.recsLeft - count; }
	public void decTracks() { this.tracksLeft--; }
}

