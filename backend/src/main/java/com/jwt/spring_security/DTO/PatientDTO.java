package com.jwt.spring_security.DTO;

import java.util.Date;

public class PatientDTO {
    // Basic Patient Information
    private String patientID; // Nullable
    private String imagePath; // Nullable
    private String lastName;
    private String givenName;
    private Character middleInitial; // Nullable
    private Character sex;
    private String address;
    private Integer age; // Nullable
    private Date birthday; // Nullable
    private String religion; // Nullable
    private String occupation; // Nullable
    private Date lastDelivery; // Nullable
    private String philhealthID; // Nullable

    // Nested DTOs for related entities
    private SpouseDTO spouse; // Nullable
    private PregnancyDTO pregnancy; // Nullable
    private ConsultationDTO consultation; // Nullable
    private MedicalHistoryDTO medicalHistory; // Nullable

    public MedicalHistoryDTO getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(MedicalHistoryDTO medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public String getPatientID() {
        return patientID;
    }

    public void setPatientID(String patientID) {
        this.patientID = patientID;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
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

    public SpouseDTO getSpouse() {
        return spouse;
    }

    public void setSpouse(SpouseDTO spouse) {
        this.spouse = spouse;
    }

    public PregnancyDTO getPregnancy() {
        return pregnancy;
    }

    public void setPregnancy(PregnancyDTO pregnancy) {
        this.pregnancy = pregnancy;
    }

    public ConsultationDTO getConsultation() {
        return consultation;
    }

    public void setConsultation(ConsultationDTO consultation) {
        this.consultation = consultation;
    }
}

