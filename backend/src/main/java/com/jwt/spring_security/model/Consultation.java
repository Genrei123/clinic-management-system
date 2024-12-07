package com.jwt.spring_security.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long consultation_id;

    @OneToOne
    @JoinColumn(name = "clientID", referencedColumnName = "clientID")
    @JsonBackReference
    private Patient patient;

    private String consultation_date;
    private Integer AOG;  // Changed to Integer
    private String BP;
    private Float weight; // Changed to Float
    private Float FH;     // Changed to Float
    private Float FHT;    // Changed to Float
    private String remarks;

    public Long getConsultation_id() {
        return consultation_id;
    }

    public void setConsultation_id(Long consultation_id) {
        this.consultation_id = consultation_id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getConsultation_date() {
        return consultation_date;
    }

    public void setConsultation_date(String consultation_date) {
        this.consultation_date = consultation_date;
    }

    public int getAOG() {
        return AOG;
    }

    public void setAOG(int AOG) {
        this.AOG = AOG;
    }

    public String getBP() {
        return BP;
    }

    public void setBP(String BP) {
        this.BP = BP;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public float getFH() {
        return FH;
    }

    public void setFH(float FH) {
        this.FH = FH;
    }

    public float getFHT() {
        return FHT;
    }

    public void setFHT(float FHT) {
        this.FHT = FHT;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
