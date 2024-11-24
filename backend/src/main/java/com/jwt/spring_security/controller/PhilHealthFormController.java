package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Documents.CF1Form;
import com.jwt.spring_security.model.Documents.CSFForm;
import com.jwt.spring_security.model.Patient;
import com.jwt.spring_security.repo.CSFFormRepository;
import com.jwt.spring_security.repo.PatientRepo;
import com.jwt.spring_security.service.PhilHealthFormService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PhilHealthFormController {

    @Autowired
    private PhilHealthFormService philHealthFormService;

    @Autowired
    private PatientRepo patientRepository;
    
    @Autowired
    private CSFFormRepository csfFormRepository;

    // CSF Form endpoints
    @PostMapping("/csf-forms")
    public ResponseEntity<?> createCSFForm(@RequestBody CSFFormRequest request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        CSFForm form = philHealthFormService.createCSFForm(patient);

        // Update additional fields from request
        form.setMI_Name_Extension(request.getMI_Name_Extension());
        form.setMI_Confinement(request.getMI_Confinement());
        form.setOwner_accreditation_no(request.getOwner_accreditation_no());
        form.setOwner_name(request.getOwner_name());
        form.setRepresentative(request.getRepresentative());
        form.setOwner(request.getOwner());
        form.setDate_signed(request.getDate_signed());

        form = csfFormRepository.save(form);
        return ResponseEntity.ok(form);
    }

    @GetMapping("/csf-forms/{id}")
    public ResponseEntity<?> getCSFForm(@PathVariable Long id) {
        CSFForm form = csfFormRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CSF Form not found"));
        return ResponseEntity.ok(form);
    }

    @GetMapping("/patients/{patientId}/csf-forms")
    public ResponseEntity<?> getPatientCSFForms(@PathVariable Long patientId) {
        List<CSFForm> forms = csfFormRepository.findByPatientClientID(patientId);
        return ResponseEntity.ok(forms);
    }

    // CF1 Form endpoints
    @PostMapping("/cf1-forms")
    public ResponseEntity<?> createCF1Form(@RequestBody CF1FormRequest request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        CF1Form form = philHealthFormService.createCF1Form(patient);

        // Update additional fields from request
        form.setMI_name_extension(request.getMI_name_extension());
        form.setMI_landline_no(request.getMI_landline_no());
        form.setMI_mobile_no(request.getMI_mobile_no());
        form.setMI_email_address(request.getMI_email_address());
        form.setPI_name_extension(request.getPI_name_extension());
        form.setPI_sex_male(request.getPI_sex_male());
        form.setPI_sex_female(request.getPI_sex_female());

        form = cf1FormRepository.save(form);
        return ResponseEntity.ok(form);
    }

    @GetMapping("/cf1-forms/{id}")
    public ResponseEntity<?> getCF1Form(@PathVariable Long id) {
        CF1Form form = cf1FormRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CF1 Form not found"));
        return ResponseEntity.ok(form);
    }

    @GetMapping("/patients/{patientId}/cf1-forms")
    public ResponseEntity<?> getPatientCF1Forms(@PathVariable Long patientId) {
        List<CF1Form> forms = cf1FormRepository.findByPatientClientID(patientId);
        return ResponseEntity.ok(forms);
    }
}

// Request DTOs
class CSFFormRequest {
    private Long patientId;
    private String MI_Name_Extension;
    private String MI_Confinement;
    private String owner_accreditation_no;
    private String owner_name;
    private String representative;
    private String owner;
    private Date date_signed;

    
    // Getters and setters
}

class CF1FormRequest {
    private Long patientId;
    private String MI_name_extension;
    private String MI_landline_no;
    private String MI_mobile_no;
    private String MI_email_address;
    private String PI_name_extension;
    private Boolean PI_sex_male;
    private Boolean PI_sex_female;
    // Getters and setters
}