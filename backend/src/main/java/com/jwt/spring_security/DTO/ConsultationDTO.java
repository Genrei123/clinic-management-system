package com.jwt.spring_security.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ConsultationDTO {
    private String consultationDate;
    @JsonProperty("AOG")
    private Integer AOG; // Nullable
    @JsonProperty("BP")
    private String BP; // Nullable
    private Float weight; // Nullable
    @JsonProperty("FH")
    private Float FH; // Nullable
    @JsonProperty("FHT")
    private Float FHT; // Nullable
    private String remarks; // Nullable

    public String getConsultationDate() {
        return consultationDate;
    }

    public void setConsultationDate(String consultationDate) {
        this.consultationDate = consultationDate;
    }

    public Integer getAOG() {
        return AOG;
    }

    public void setAOG(Integer AOG) {
        this.AOG = AOG;
    }

    public String getBP() {
        return BP;
    }

    public void setBP(String BP) {
        this.BP = BP;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public Float getFH() {
        return FH;
    }

    public void setFH(Float FH) {
        this.FH = FH;
    }

    public Float getFHT() {
        return FHT;
    }

    public void setFHT(Float FHT) {
        this.FHT = FHT;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
