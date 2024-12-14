package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Service;
import com.jwt.spring_security.model.Services;
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
    public ResponseEntity<?> addService(@RequestBody Services services) {
        try {
            serviceRepository.save(services);
            return ResponseEntity.ok("Service added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getServices")
    public ResponseEntity<?> getServices() {
        try {
            return ResponseEntity.ok(serviceRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteService/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        try {
            serviceRepository.deleteById(id);
            return ResponseEntity.ok("Service deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/updateService")
    public ResponseEntity<?> updateService(@RequestBody Services services) {
        try {
            serviceRepository.save(services);
            return ResponseEntity.ok("Service updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}

