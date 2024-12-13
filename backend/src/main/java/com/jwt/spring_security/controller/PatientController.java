package com.jwt.spring_security.controller;

import com.jwt.spring_security.DTO.ConsultationDTO;
import com.jwt.spring_security.DTO.PatientDTO;
import com.jwt.spring_security.model.Patient;
import com.jwt.spring_security.model.Spouse;
import com.jwt.spring_security.repo.PatientRepo;
import com.jwt.spring_security.service.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
public class PatientController {
    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private PatientService patientService;

    @PostMapping("/uploadPatientImage")
    public ResponseEntity<?> uploadPatientImage(@RequestParam("file") MultipartFile file, @RequestParam("patientId") Long patientId) {
        try {
            // Define the path where the file will be saved
            Path uploadPath = Paths.get("uploads/patient_images");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save the file
            Path filePath = uploadPath.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), filePath);

            // Update the patient's image path in the database (assuming you have a field for this)
            Patient patient = patientRepo.findById(patientId).orElseThrow(() -> new RuntimeException("Patient not found"));
            patient.setImagePath(filePath.toString());
            patientRepo.save(patient);

            return ResponseEntity.ok("Image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    @PostMapping("/addPatient")
    public ResponseEntity<Long> addPatient(@RequestBody PatientDTO patientDTO) {
        Long clientID = patientService.addPatient(patientDTO);
        return ResponseEntity.ok(clientID);
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