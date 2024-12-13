package com.jwt.spring_security.service;

import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.repo.EmployeeRepo;
import com.jwt.spring_security.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private JWTService jwtService;

    public Employee save(Employee employee) {
        employee.setPassword(new BCryptPasswordEncoder(Constants.BCRYPT_STRENGTH).encode(employee.getPassword()));
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
        if (existingEmployee != null) {
            existingEmployee.setUsername(employeeDetails.getUsername());
            if (employeeDetails.getPassword() != null && !employeeDetails.getPassword().isEmpty()) {
                existingEmployee.setPassword(new BCryptPasswordEncoder(Constants.BCRYPT_STRENGTH).encode(employeeDetails.getPassword()));
            }
            return employeeRepo.save(existingEmployee);
        }
        return null;
    }
}




