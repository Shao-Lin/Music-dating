package com.vibe.security.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.Optional;

@Service
@Slf4j
public class AudioTrimService {
    public Resource trimFirst20s(Resource in)
            throws IOException, InterruptedException {

        /* 1️⃣  Имя (если null → "audio.mp3") */
        String originalName = Optional.ofNullable(in.getFilename())
                .filter(n -> !n.isBlank())
                .orElse("audio.mp3");

        /* 2️⃣  temp-файлы */
        Path src = Files.createTempFile("suno-src-", getExt(originalName));
        Path dst = Files.createTempFile("suno-20s-", getExt(originalName));

        try {
            /* 2.1  копируем Resource → src */
            try (InputStream is = in.getInputStream()) {
                Files.copy(is, src, StandardCopyOption.REPLACE_EXISTING);
            }

            /* 2.2  ffmpeg: 0 → 20 с */
            ProcessBuilder pb = new ProcessBuilder(
                    "ffmpeg", "-y",
                    "-i", src.toString(),
                    "-ss", "0",       // начало
                    "-t", "20",       // длительность
                    "-acodec", "libmp3lame",
                    "-b:a", "192k",
                    dst.toString()
            );
            int code = pb.inheritIO().start().waitFor();
            if (code != 0) {
                throw new IOException("ffmpeg exited with " + code);
            }

            /* 2.3  читаем trimmed-файл в память */
            byte[] bytes = Files.readAllBytes(dst);

            /* 3️⃣  возвращаем ByteArrayResource с тем же именем */
            return new ByteArrayResource(bytes) {
                @Override public String getFilename() {
                    return originalName;
                }
            };

        } finally {
            /* 4️⃣  подчистка temp-файлов */
            safeDelete(src);
            safeDelete(dst);
        }
    }

    /* ---- helpers --------------------------------------------------- */

    private static String getExt(String name) {
        int dot = name.lastIndexOf('.');
        return dot >= 0 ? name.substring(dot) : ".bin";
    }

    private static void safeDelete(Path p) {
        try { Files.deleteIfExists(p); }
        catch (IOException e) { log.warn("Can't delete {}", p, e); }
    }
}
