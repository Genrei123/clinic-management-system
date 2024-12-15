package com.jwt.spring_security.service;

import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.repo.EmployeeRepo;
import com.jwt.spring_security.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private JWTService jwtService;

    // Save a new employee (with password encryption)
    public Employee save(Employee employee) {
        employee.setPassword(new BCryptPasswordEncoder(Constants.BCRYPT_STRENGTH).encode(employee.getPassword()));
        return employeeRepo.save(employee);
    }

    // Find all employees
    public List<Employee> findAll() {
        return employeeRepo.findAll();
    }

    // Find employee by employeeID
    public Employee findByEmployeeID(Long employeeID) {
        return employeeRepo.findByEmployeeID(employeeID); // Updated to Long
    }

    // Find employee by username (this is the new method)
    public Employee findByUsername(String username) {
        return employeeRepo.findByUsername(username); // Ensure the repository has this method
    }

    // Find employee by ID
    public Optional<Employee> findByID(Long id) {
        return employeeRepo.findById(id);
    }

    // Check if employee exists by employeeID
    public boolean existsByEmployeeID(Long employeeID) {
        return employeeRepo.findByEmployeeID(employeeID) != null; // Updated to Long
    }

    // Delete employee by employeeID
    public boolean deleteByEmployeeID(Long employeeID) {
        if (employeeRepo.existsByEmployeeID(employeeID)) {
            employeeRepo.deleteByEmployeeID(employeeID); // Updated to Long
            return true;
        }
        return false;
    }

    // Update employee information
    public Employee updateEmployee(Long employeeID, Employee employeeDetails) {
        Employee existingEmployee = employeeRepo.findByEmployeeID(employeeID);
        if (existingEmployee != null) {
            existingEmployee.setUsername(employeeDetails.getUsername());
            if (employeeDetails.getPassword() != null && !employeeDetails.getPassword().isEmpty()) {
                existingEmployee.setPassword(new BCryptPasswordEncoder(Constants.BCRYPT_STRENGTH).encode(employeeDetails.getPassword()));
            }
            return employeeRepo.save(existingEmployee);
        }
        return null;
    }

    // Save login information with timestamp
    public Employee saveLoginTimestamp(Long employeeID) {
        Employee employee = employeeRepo.findByEmployeeID(employeeID);
        if (employee != null) {
            employee.setLoginTimeStamp(LocalDateTime.now()); // Set current timestamp on login
            return employeeRepo.save(employee);
        }
        return null; // If employee not found
    }
}
