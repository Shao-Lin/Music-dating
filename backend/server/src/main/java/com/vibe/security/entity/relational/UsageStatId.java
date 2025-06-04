package com.vibe.security.entity.relational;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

@Embeddable
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UsageStatId implements Serializable {

	@Column(name = "user_id", nullable = false)
	private UUID userId;

	@Column(name = "usage_date", nullable = false)
	private LocalDate usageDate;

	@Override public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof UsageStatId id)) return false;
		return Objects.equals(userId, id.userId) &&
			Objects.equals(usageDate, id.usageDate);
	}
	@Override public int hashCode() { return Objects.hash(userId, usageDate); }
}
