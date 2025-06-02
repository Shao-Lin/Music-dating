package com.vibe.security.payload;

import java.time.LocalDate;

public record UserSettingDto(
        String lang,
        Integer ageFrom,
        Integer ageTo,
        Boolean subActive,
        LocalDate activeFrom,
        LocalDate activeTo) {}
