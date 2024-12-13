package com.jwt.spring_security.model;

import jakarta.persistence.Entity;

import java.time.LocalDateTime;

@Entity
public class Employee extends Users {
    private Long employeeID;
    private LocalDateTime loginTimeStamp;
    private LocalDateTime birthdate;

    public Long getEmployeeID() {
        return employeeID;
    }


    public void setEmployeeID(Long employeeID) {
        this.employeeID = employeeID;
    }

    public LocalDateTime getLoginTimeStamp() {
        return loginTimeStamp;
    }

    public void setLoginTimeStamp(LocalDateTime loginTimeStamp) {
        this.loginTimeStamp = loginTimeStamp;
    }

    public LocalDateTime getBirthdate(){
        return birthdate;
    }

    public void setBirthdate(LocalDateTime birthdate){
        this.birthdate = birthdate;
    }


    @Override
    public String toString() {
        return "Employee{" +
                "employeeID=" + employeeID +
                ", loginTimeStamp=" + loginTimeStamp +
                ", username='" + getUsername() + '\'' +
                ", role='" + getRole() + '\'' +
                '}';
    }
}
