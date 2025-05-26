package com.vibe.security.entity.relational;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "refresh_token")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "token_value", nullable = false)
    private String tokenValue;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private LocalDateTime expiry;

    @Column(name = "created_at", insertable = false)
    private LocalDateTime createdAt;

    public boolean isExpired() {
        return expiry.isBefore(LocalDateTime.now());
    }
}
