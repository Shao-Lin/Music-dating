package com.vibe.security.entity.relational;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "user_setting")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserSettingEntity {

    @Id
    @UuidGenerator
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String lang;
    private Integer ageFrom;
    private Integer ageTo;

    private Boolean subActive;
    private LocalDate activeFrom;
    private LocalDate activeTo;
}
