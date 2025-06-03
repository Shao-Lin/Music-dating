package com.vibe.security.payload;

import java.util.UUID;

public record TrackDto (
        UUID trackId,
        String url,
        String name,
        String coverUrl,
        Boolean isMain
) {
}
