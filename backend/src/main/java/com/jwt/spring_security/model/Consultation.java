package com.jwt.spring_security.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Consultation {
    @Id
    private Long consultation_id;
    @OneToOne
    @JoinColumn(name = "clientID", referencedColumnName = "clientID")
    private Patient patient;
    private String consultation_date;
    private int AOG;
    private String BP;
    private float weight;
    private float FH;
    private float FHT;
    private String remarks;
}
