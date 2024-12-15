package com.jwt.spring_security.repo;

import com.jwt.spring_security.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    Employee findByEmployeeID(Long employeeID); // Change to Long
    Employee findByUsername(String username); // Method to find employee by username
    boolean existsByEmployeeID(Long employeeID); // Change to Long
    void deleteByEmployeeID(Long employeeID); // Change to Long
}
