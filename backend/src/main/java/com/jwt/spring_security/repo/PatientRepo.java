package com.jwt.spring_security.repo;

import com.jwt.spring_security.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepo extends JpaRepository<Patient, Long> {
    List<Patient> findPatientByGivenName(String given_name);
}
