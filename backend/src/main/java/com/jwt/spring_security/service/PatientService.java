package com.jwt.spring_security.service;

import com.jwt.spring_security.repo.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    @Autowired
    private PatientRepo patientRepo;

    public boolean deleteByPatientID(Long id) {
        if (patientRepo.existsById(id)) {
            patientRepo.deleteById(id);
            return true;
        }
        return false;
    }


}
