package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.repo.EmployeeRepo;
import com.jwt.spring_security.repo.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmployeeRepo employeeRepo;


    @PostMapping("/addEmployee")
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.save(employee);
    }


    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }


    @GetMapping("/readEmployee/{employeeID}")
    public ResponseEntity<Employee> getEmployee(@PathVariable int employeeID) {
        Employee employee = employeeRepo.findByEmployeeID(employeeID);
        if (employee == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employee);
    }


    @PutMapping("/updateEmployee/{employeeID}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable int employeeID, @RequestBody Employee employeeDetails) {
        Employee updatedEmployee = employeeService.updateEmployee(employeeID, employeeDetails);

        if (updatedEmployee != null) {
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/deleteEmployee/{employeeID}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable int employeeID) {
        boolean isRemoved = employeeService.deleteByEmployeeID(employeeID);
        if (!isRemoved) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
