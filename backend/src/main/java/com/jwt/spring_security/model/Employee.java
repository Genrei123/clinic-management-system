package com.jwt.spring_security.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
public class Employee extends Users {
    private int employeeID;
    private LocalDateTime loginTimeStamp;
    private String imagePath;

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public int getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(int employeeID) {
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
                "employeeID=" + employeeID +
                ", loginTimeStamp=" + loginTimeStamp +
                ", username='" + getUsername() + '\'' +
                ", role='" + getRole() + '\'' +
                '}';
    }
}
