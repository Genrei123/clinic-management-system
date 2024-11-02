package com.jwt.spring_security.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Branch {

    @Id
    private Long branchID;
    private String branchName;
    private String branchAddress;
    private String branchContact;

    public Long getBranchID() {
        return branchID;
    }

    public String getBranchName() {
        return branchName;
    }

    public String getBranchAddress() {
        return branchAddress;
    }

    public String getBranchContact() {
        return branchContact;
    }
}
