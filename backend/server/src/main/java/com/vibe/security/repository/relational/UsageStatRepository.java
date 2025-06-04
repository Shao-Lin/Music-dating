package com.vibe.security.repository.relational;

import com.vibe.security.entity.relational.UsageStat;
import com.vibe.security.entity.relational.UsageStatId;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsageStatRepository extends JpaRepository<UsageStat, UsageStatId> {

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("""
           select u
           from UsageStat u
           where u.id.userId   = :userId
             and u.id.usageDate = :date
           """)
	Optional<UsageStat> findForUpdate(@Param("userId") UUID userId,
																		@Param("date") LocalDate date);

	/* для джобы очистки */
	@Modifying
	@Query("delete from UsageStat u where u.id.usageDate < :date")
	int deleteOlderThan(@Param("date") LocalDate date);
}
