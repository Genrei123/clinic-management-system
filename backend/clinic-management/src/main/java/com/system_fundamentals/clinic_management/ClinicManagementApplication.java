package com.system_fundamentals.clinic_management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class ClinicManagementApplication {

	@GetMapping("/")
	public String home() {
		return "home";
	}

	public static void main(String[] args) {
		SpringApplication.run(ClinicManagementApplication.class, args);
	}

}
