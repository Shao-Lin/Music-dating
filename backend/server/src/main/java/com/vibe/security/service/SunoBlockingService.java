package com.vibe.security.service;

import com.vibe.security.payload.GenerateResponse;
import com.vibe.security.payload.RecordInfoResponse;
import com.vibe.security.payload.SunoApiResponse;
import com.vibe.security.payload.SunoGeneratePrompt;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class SunoBlockingService {

    private final RestClient sunoRestClient;

    public RecordInfoResponse generateAndWait(SunoGeneratePrompt req)
            throws InterruptedException {

        SunoApiResponse<GenerateResponse> created =
                sunoRestClient.post()
                        .uri("/api/v1/generate")
                        .body(req)
                        .retrieve()
                        .body(new ParameterizedTypeReference<>() {});
        String taskId = created.data().taskId();

        Thread.sleep(Duration.ofMinutes(1).toMillis());

        while (true) {
            SunoApiResponse<RecordInfoResponse> info =
                    sunoRestClient.get()
                            .uri(uri -> uri.path("/api/v1/generate/record-info")
                                    .queryParam("taskId", taskId)
                                    .build())
                            .retrieve()
                            .body(new ParameterizedTypeReference<>() {});

            if (info.data().finished()) {
                return info.data();
            }
            Thread.sleep(Duration.ofSeconds(30).toMillis());
        }
    }
}
