package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jwt.spring_security.exception.model.ApiErrorResponse;
import org.springframework.validation.annotation.Validated;

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
        Employee savedEmployee = employeeService.save(employee); // birthdate is included automatically
        return ResponseEntity.ok(savedEmployee);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findAll();
        return ResponseEntity.ok(employees); // birthdate will be included when sending the employee list
    }

    @GetMapping("/readEmployee/{employeeID}")
    public ResponseEntity<?> getEmployee(@PathVariable Long employeeID) {
        Employee employee = employeeService.findByEmployeeID(employeeID);
        if (employee == null) {
            return ResponseEntity.status(404)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.ok(employee); // birthdate will be part of the employee response
    }

    @PutMapping("/updateEmployee/{employeeID}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long employeeID, @RequestBody @Validated Employee employeeDetails) {
        Employee updatedEmployee = employeeService.updateEmployee(employeeID, employeeDetails); // birthdate is updated automatically
        if (updatedEmployee == null) {
            return ResponseEntity.status(404)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/deleteEmployee/{employeeID}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long employeeID) {
        boolean isRemoved = employeeService.deleteByEmployeeID(employeeID);
        if (!isRemoved) {
            return ResponseEntity.status(404)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.noContent().build();
    }
}

