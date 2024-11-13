package com.jwt.spring_security.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Patient  {
    @Id
    private Long clientID;  // The unique ID of the patient
    private String lastName;
    private String givenName;
    private Character middleInitial;
    private String address;
    private int age;
    private Date birthday;
    private String religion;
    private String occupation;
    private Date lastDelivery;
    private String philhealthID;

    // Getters and Setters

    public Long getClientID() {
        return clientID;  // Return the clientID (patient's ID)
    }

    public void setClientID(Long clientID) {
        this.clientID = clientID;  // Set the clientID (patient's ID)
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


    public Long getId() {
        return this.clientID;  // Return the unique patient ID
    }

    public String getName() {
        String fullName = givenName + " " + (middleInitial != null ? middleInitial + ". " : "") + lastName;
        return fullName;
    }



}
