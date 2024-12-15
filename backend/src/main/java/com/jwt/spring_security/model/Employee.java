package com.jwt.spring_security.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Employee extends Users {

    @Id
    private String employeeID;
    private LocalDateTime loginTimeStamp;

    // Getters and setters
    public String getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(String employeeID) {
        this.employeeID = employeeID;
    }

    public LocalDateTime getLoginTimeStamp() {
        return loginTimeStamp;
    }

    public void setLoginTimeStamp(LocalDateTime loginTimeStamp) {
        this.loginTimeStamp = loginTimeStamp;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "employeeID='" + employeeID + '\'' +
                ", loginTimeStamp=" + loginTimeStamp +
                ", username='" + getUsername() + '\'' +
                ", role='" + getRole() + '\'' +
                '}';
    }
}
