package com.jwt.spring_security.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Employee extends Users {

    private int employeeID;
    private LocalDateTime loginTimeStamp;



    public Employee() {}
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
                ", password='" + getPassword() + '\'' +
                '}';
    }
}
