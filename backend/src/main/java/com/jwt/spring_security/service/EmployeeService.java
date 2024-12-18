package com.jwt.spring_security.service;

import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    public Employee save(Employee employee) {
        employee.setPassword(new BCryptPasswordEncoder().encode(employee.getPassword()));
        return employeeRepo.save(employee);
    }

    public List<Employee> findAll() {
        return employeeRepo.findAll();
    }

    public Employee findByEmployeeID(int employeeID) {
        return employeeRepo.findByEmployeeID(employeeID);
    }

    public Optional<Employee> findByID(Long id) {
        return employeeRepo.findById(id);
    }

    public boolean existsByEmployeeID(int employeeID) {
        return employeeRepo.findByEmployeeID(employeeID) != null;
    }

    public boolean deleteByEmployeeID(int employeeID) {
        if (employeeRepo.existsById((long) employeeID)) {
            employeeRepo.deleteById((long) employeeID);
            return true;
        }
        return false;
    }

    public Employee updateEmployee(int employeeID, Employee employeeDetails) {
        Employee existingEmployee = employeeRepo.findByEmployeeID(employeeID);
        if (existingEmployee == null) {
            return null;
        }

        existingEmployee.setUsername(employeeDetails.getUsername());
        existingEmployee.setEmail(employeeDetails.getEmail());
        existingEmployee.setRole(employeeDetails.getRole());
        return employeeRepo.save(existingEmployee);
    }
}
