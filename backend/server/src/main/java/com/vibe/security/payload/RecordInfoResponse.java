package com.vibe.security.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record RecordInfoResponse(
        String taskId,
        String parentMusicId,
        String param,
        GenerationResponse response,
        String status,
        String type,
        String operationType,
        int errorCode,
        String errorMessage) {

    public boolean finished() {
        return switch (status) {
            case "SUCCESS",
                 "CREATE_TASK_FAILED",
                 "CALLBACK_EXCEPTION",
                 "GENERATE_AUDIO_FAILED",
                 "SENSITIVE_WORD_ERROR" -> true;
            default -> false;
        };
    }

    /* ───────────── вложенные DTO ───────────── */

     public record GenerationResponse(
            String taskId,
            List<SunoTrack> sunoData) {
    }

    public record SunoTrack(
            String id,
            String audioUrl,
            String streamAudioUrl,
            String imageUrl,
            String prompt,
            String modelName,
            String title,
            String tags,
            Instant createTime,
            double duration) {}
}

