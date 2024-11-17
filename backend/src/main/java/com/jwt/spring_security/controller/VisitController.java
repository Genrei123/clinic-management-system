package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Patient;
import com.jwt.spring_security.model.Visit;
import com.jwt.spring_security.repo.VisitRepository;
import com.jwt.spring_security.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VisitController {
    @Autowired
    private PatientService patientService;

    @Autowired
    private VisitRepository visitRepository;

    @PostMapping("/addPatientLog")
    public ResponseEntity<String> addVisit(@RequestParam Long patientId, @RequestParam String purpose) {
        try {
            // Fetch the patient by ID
            Patient patient = patientService.findById(patientId);

            if (patient == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found.");
            }

            // Create a new Visit
            Visit visit = new Visit();
            visit.setPatient(patient);
            visit.setPurpose(purpose);

            // Save the Visit
            visitRepository.save(visit);

            return ResponseEntity.ok("Visit logged successfully for Patient ID: " + patientId);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error logging visit: " + e.getMessage());
        }
    }
}
