package com.jwt.spring_security.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import java.util.Date;

@Entity
public class Pregnancy {
    @Id
    private Long pregnancy_id;

    @OneToOne
    @JoinColumn(name = "client_id", referencedColumnName = "client_id")
    private Patient patient;

    private int gravida;
    private int para;
    private int term;
    private int pre_term;
    private int abortion;
    private int living;
    private Date LMP;
    private Date EDC;
    private Date IT_date;
    private Date menarche;
}
