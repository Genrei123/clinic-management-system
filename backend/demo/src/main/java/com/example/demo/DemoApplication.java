package com.example.demo;

import com.example.demo.Test.Test;
import com.example.demo.Test.TestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SpringBootApplication
@RestController
public class DemoApplication {

	@Autowired
	private TestRepo testRepo;

	@GetMapping("/")
	public String home() {
		return "Hello World";
	}

	@PostMapping("/addTest")
	public Test addTest(@RequestBody Test test) {
		return testRepo.save(test);
	}

	@GetMapping("/getData")
	public List<Test> getTests() {
		return testRepo.findAll();
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
