package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.repo.EmployeeRepo;
import com.jwt.spring_security.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jwt.spring_security.exception.model.ApiErrorResponse;
import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/addEmployee")
    public ResponseEntity<?> addEmployee(@RequestBody @Validated Employee employee) {
        if (employeeService.existsByEmployeeID(employee.getEmployeeID())) {
            return ResponseEntity.badRequest()
                    .body(new ApiErrorResponse("Validation Error", "Employee ID already exists", employee.getEmployeeID()));
        }
        Employee savedEmployee = employeeService.save(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findAll();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/readEmployee/{employeeID}")
    public ResponseEntity<?> getEmployee(@PathVariable int employeeID) {
        Employee employee = employeeService.findByEmployeeID(employeeID);
        if (employee == null) {
            return ResponseEntity.status(404)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/updateEmployee/{employeeID}")
    public ResponseEntity<?> updateEmployee(@PathVariable int employeeID, @RequestBody @Validated Employee employeeDetails) {
        Employee updatedEmployee = employeeService.updateEmployee(employeeID, employeeDetails);
        if (updatedEmployee == null) {
            return ResponseEntity.status(404)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/deleteEmployee/{employeeID}")
    public ResponseEntity<?> deleteEmployee(@PathVariable int employeeID) {
        boolean isRemoved = employeeService.deleteByEmployeeID(employeeID);
        if (!isRemoved) {
            return ResponseEntity.status(404)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.noContent().build();
    }
}

