package com.vibe.security.controller;

import com.vibe.security.entity.relational.UserEntity;
import com.vibe.security.mapper.UserMapper;
import com.vibe.security.payload.ReactionResponse;
import com.vibe.security.payload.UserDto;
import com.vibe.security.payload.UserSettingDto;
import com.vibe.security.repository.relational.UserRepository;
import com.vibe.security.service.DailyLimitService;
import com.vibe.security.service.MatchService;
import com.vibe.security.service.UserSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class MatchController {
    private final UserRepository userRepository;
    private final MatchService matchService;
    private final UserMapper userMapper;
    private final UserSettingService userSettingService;
    private final DailyLimitService dailyLimitService;

    @GetMapping("/recommendations")
    public Set<UserDto> getUnseenUsers(@AuthenticationPrincipal UserDetails userDetails,
                                       @RequestParam(name = "page") Integer page,
                                       @RequestParam(name = "size") Integer size
    ) {
        UserEntity user = userRepository.findByUsername(userDetails.getUsername()).get();

        UserSettingDto userSettingDto = userSettingService.get(user);

        LocalDate today = LocalDate.now();

        LocalDate birthDateTo = today.minusYears(userSettingDto.ageFrom()).plusDays(1);
        LocalDate birthDateFrom = today.minusYears(userSettingDto.ageTo()).minusDays(1);

        //dailyLimitService.consume(user.getId(), DailyLimitService.UsageType.RECOMMENDATION, userSettingDto.subActive());

        return userRepository.findUnseenUsers(user.getId(), user.getGender(), birthDateFrom, birthDateTo, PageRequest.of(page, size))
                .stream()
                .map(userMapper::toDto)
                .collect(Collectors.toSet());
    }

    @GetMapping("/matches")
    public Set<UserDto> getMyMatches(@AuthenticationPrincipal UserDetails principal) {
        UUID userId = userRepository.findByUsername(principal.getUsername()).get().getId();

        return userRepository.findMutualMatches(userId)
                .stream()
                .map(userMapper::toDto)
                .collect(Collectors.toSet());
    }

    @GetMapping("/likes/incoming")
    public Set<UserDto> getIncomingLikes(@AuthenticationPrincipal UserDetails principal) {

        UUID currentUserId = userRepository.findByUsername(principal.getUsername()).get().getId();

        return userRepository.findIncomingLikes(currentUserId)
                .stream()
                .map(userMapper::toDto)
                .collect(Collectors.toSet());
    }


    @PostMapping("/{targetId}/like")
    public ReactionResponse likeUser(@PathVariable UUID targetId,
                                     @AuthenticationPrincipal UserDetails principal) {

        UUID me = userRepository.findByUsername(principal.getUsername()).get().getId();
        boolean mutual = matchService.react(me, targetId, true);
        return new ReactionResponse(mutual);
    }

    @PostMapping("/{targetId}/dislike")
    public void dislikeUser(@PathVariable UUID targetId,
                            @AuthenticationPrincipal UserDetails principal) {
        UUID me = userRepository.findByUsername(principal.getUsername()).get().getId();
        matchService.react(me, targetId, false);
    }
}
