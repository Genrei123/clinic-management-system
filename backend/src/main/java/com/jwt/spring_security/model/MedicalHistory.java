package com.jwt.spring_security.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class MedicalHistory {
    @Id
    private Long medical_history_id;

    @OneToOne
    @JoinColumn(name = "clientID", referencedColumnName = "clientID")
    private Patient patient;

    private boolean smoking;
    private String allergies;
    private boolean drug_intake;
    private boolean bleeding_anemia;
    private boolean diabetes_congenital_anomalies;
    private boolean Previous_C_section;

    private boolean consectuive_miscarriages;
    private boolean post_partum_hemorrhage;
    private boolean forcep_delivery;
    private boolean hypertension;
}
