package com.jwt.spring_security.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate clientID
    private Long clientID;

    @Column(nullable = false, unique = true)
    private String varcharID;
    private String imagePath;

    private String lastName;
    private String givenName;
    private Character middleInitial;
    private Character sex;
    private String address;
    private int age;

    @Temporal(TemporalType.DATE)
    private Date birthday;

    private String religion;
    private String occupation;

    @Temporal(TemporalType.DATE)
    private Date lastDelivery;

    private String philhealthID;

    @OneToOne(mappedBy = "patient", cascade = CascadeType.ALL) // Bi-directional relationship with Spouse
    private Spouse spouse;



    // Getters and setters


    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Long getClientID() {
        return clientID;
    }

    public void setClientID(Long clientID) {
        this.clientID = clientID;
    }

    public String getVarcharID() {
        return varcharID;
    }

    public void setVarcharID(String varcharID) {
        this.varcharID = varcharID;
    }

    public Spouse getSpouse() {
        return spouse;
    }

    public void setSpouse(Spouse spouse) {
        this.spouse = spouse;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public Character getMiddleInitial() {
        return middleInitial;
    }

    public void setMiddleInitial(Character middleInitial) {
        this.middleInitial = middleInitial;
    }

    public Character getSex() {
        return sex;
    }

    public void setSex(Character sex) {
        this.sex = sex;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public Date getLastDelivery() {
        return lastDelivery;
    }

    public void setLastDelivery(Date lastDelivery) {
        this.lastDelivery = lastDelivery;
    }

    public String getPhilhealthID() {
        return philhealthID;
    }

    public void setPhilhealthID(String philhealthID) {
        this.philhealthID = philhealthID;
    }

    // Other getters and setters...
}
