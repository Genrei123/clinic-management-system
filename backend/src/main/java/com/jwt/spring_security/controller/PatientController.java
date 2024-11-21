package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Patient;
import com.jwt.spring_security.model.Spouse;
import com.jwt.spring_security.repo.PatientRepo;
import com.jwt.spring_security.service.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PatientController {
    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private PatientService patientService;

    @PostMapping("/addPatient")
    public ResponseEntity<?> addPatient(@Validated @RequestBody Patient patient) {
        // Check if patient with the same ID already exists
        if (patientRepo.existsById(patient.getClientID())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Patient with ID " + patient.getClientID() + " already exists.");
        }

        // Link spouse to patient if provided
        if (patient.getSpouse() != null) {
            Spouse spouse = patient.getSpouse();
            spouse.setPatient(patient);
        }

        // Save patient
        Patient savedPatient = patientRepo.save(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPatient);
    }

    @GetMapping("/getPatient")
    public ResponseEntity<?> getPatients() {
        List<Patient> patients = patientRepo.findAll();
        if (patients.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No patients found.");
        }
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/searchPatients")
    public ResponseEntity<?> searchPatient(@RequestParam String query) {
        List<Patient> patients = patientRepo.findPatientByGivenName(query);
        if (patients.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No patients found with the given name: " + query);
        }
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/getPatient/{id}")
    public ResponseEntity<?> getPatient(@PathVariable Long id) {
        Optional<Patient> patient = patientRepo.findById(id);
        if (patient.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient with ID " + id + " not found.");
        }
        return ResponseEntity.ok(patient);
    }

    @PatchMapping("/updatePatient")
    public ResponseEntity<?> updatePatient(@Validated @RequestBody Patient patient) {
        // Check if patient exists
        if (!patientRepo.existsById(patient.getClientID())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient with ID " + patient.getClientID() + " not found.");
        }

        // Update patient details
        Patient updatedPatient = patientRepo.save(patient);
        return ResponseEntity.ok(updatedPatient);
    }

    @DeleteMapping("/deletePatient/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Long id) {
        // Check if patient exists
        if (!patientRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient with ID " + id + " not found.");
        }

        // Delete patient
        patientRepo.deleteById(id);
        return ResponseEntity.ok("Patient with ID " + id + " deleted successfully.");
    }
}

