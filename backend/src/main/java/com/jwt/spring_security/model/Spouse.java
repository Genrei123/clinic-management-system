package com.jwt.spring_security.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Spouse {
    @Id
    private Long spouse_id;

    @OneToOne
    @JoinColumn(name = "clientID", referencedColumnName = "clientID")
    private Patient patient;

    private String spouse_name;
    private String spouse_birthday;
    private String spouse_religion;
    private String spouse_occupation;
    private String spouse_contact_number;
}
