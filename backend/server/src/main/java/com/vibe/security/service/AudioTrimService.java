package com.vibe.security.service;

import lombok.SneakyThrows;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.*;
import java.util.Optional;

@Service
public class AudioTrimService {
    @SneakyThrows
    public File trimFirst20sToFile(Resource in) {
        return doTrim(in).toFile();
    }

    @SneakyThrows
    public Resource trimFirst20sToResource(Resource in) {
        return new FileSystemResource(doTrim(in));
    }


    private Path doTrim(Resource in) throws IOException, InterruptedException {

        String originalName = Optional.ofNullable(in.getFilename())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Resource has no filename"));

        Path srcDir  = Files.createTempDirectory("suno-src-");
        Path srcPath = srcDir.resolve(originalName);

        try (InputStream is = in.getInputStream();
             OutputStream os = Files.newOutputStream(srcPath)) {
            is.transferTo(os);
        }

        Path outDir  = Files.createTempDirectory("suno-demo-");
        Path outPath = outDir.resolve(originalName);

        ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg", "-y",
                "-i", srcPath.toString(),
                "-t", "20",
                "-acodec", "libmp3lame",
                "-b:a", "192k",
                outPath.toString()
        );
        if (pb.inheritIO().start().waitFor() != 0) {
            throw new IOException("ffmpeg failed while trimming " + srcPath);
        }
        return outPath;
    }
}
