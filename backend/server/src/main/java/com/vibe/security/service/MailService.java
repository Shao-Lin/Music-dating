package com.vibe.security.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender sender;

    @SneakyThrows
    @Async
    public void sendOtp(String to, String otp) {
        SimpleMailMessage msg = new SimpleMailMessage();

        msg.setTo(to);
        msg.setFrom("vibe-mail");
        msg.setSubject("Ваш код подтверждения");
        msg.setText("Код: " + otp + " Действителен 5 минут.");

        sender.send(msg);
    }
}

