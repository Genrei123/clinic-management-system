package com.jwt.spring_security.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;

@Entity
public abstract class Document {
    @Id
    private Long documentID;

    @ManyToOne
    @JoinColumn(name = "clientID")
    private Patient patientID;

    private String philhealthID = patientID.getPhilhealthID();
    private Date createdAt;
    private Date updatedAt;
}
