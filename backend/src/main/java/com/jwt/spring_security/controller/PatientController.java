package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Item;
import com.jwt.spring_security.model.Patient;
import com.jwt.spring_security.repo.PatientRepo;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PatientController {
    @Autowired
    private PatientRepo patientRepo;

    @PostMapping("/addPatient")
    public Patient addPatient(@RequestBody Patient patient) {
        return patientRepo.save(patient);
    }

    @GetMapping("/getPatient")
    public List<Patient> getPatients() {
        return patientRepo.findAll();
    }

    @GetMapping("/searchPatients")
    public List<Patient> searchPatient(@RequestParam String query) {
        return patientRepo.findPatientByGivenName(query);
    }

    @GetMapping("/getPatient/{id}")
    public Optional<Patient> getPatient(@RequestBody Long id) {
        return patientRepo.findById(id);
    }

    @PatchMapping("/updatePatient")
    public Patient updatePatient(@RequestBody Patient patient) {
        return patientRepo.save(patient);
    }

    @DeleteMapping("/deletePatient/{id}")
    public String deletePatient(@PathVariable Long id) {
        if (!patientRepo.existsById(id)) {
            return "Patient not found";
        }
        patientRepo.deleteById(id);
        return "Patient Found";
    }
}
