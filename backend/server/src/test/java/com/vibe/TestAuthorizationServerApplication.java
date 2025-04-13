package com.vibe;

import org.springframework.boot.SpringApplication;

public class TestAuthorizationServerApplication {

	public static void main(String[] args) {
		SpringApplication.from(ServerApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
