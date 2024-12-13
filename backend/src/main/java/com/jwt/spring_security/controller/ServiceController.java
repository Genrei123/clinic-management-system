package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Service;
import com.jwt.spring_security.repo.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/service")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @PostMapping("/addService")
    public ResponseEntity<?> addService(@RequestBody Service service) {
        try {
            serviceRepository.save(service);
            return ResponseEntity.ok("Service added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}

