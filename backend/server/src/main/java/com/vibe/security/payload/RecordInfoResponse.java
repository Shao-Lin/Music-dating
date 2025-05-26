package com.vibe.security.payload;

import java.util.List;

public record RecordInfoResponse(String status, List<SongPayload> songList) {
    public boolean finished() {
        return switch (status) {
            case "success", "fail", "callback_exception" -> true;
            default -> false;
        };
    }
}
