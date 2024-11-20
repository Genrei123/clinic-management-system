package com.jwt.spring_security.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Patient  {
    @Id
    private Long client_id;
    private String last_name;
    private String given_name;
    private Character middle_initial;
    private String address;
    private int age;
    private Date birthday;
    private String religion;
    private String occupation;
    private Date last_delivery;

    // Spouse


}
