package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.service.EmployeeService;
import com.jwt.spring_security.exception.model.ApiErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findAll();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{employeeID}")
    public ResponseEntity<?> getEmployeeByEmployeeID(@PathVariable int employeeID) {
        Employee employee = employeeService.findByEmployeeID(employeeID);
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.ok(employee);
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeService.save(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
    }

    @PutMapping("/updateAccount/{employeeID}")
    public ResponseEntity<?> updateAccount(@PathVariable int employeeID, @RequestBody Employee updatedEmployee) {
        Employee existingEmployee = employeeService.updateEmployee(employeeID, updatedEmployee);
        if (existingEmployee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.ok(existingEmployee);
    }




    @DeleteMapping("/delete/{employeeID}")
    public ResponseEntity<?> deleteEmployee(@PathVariable int employeeID) {
        boolean isRemoved = employeeService.deleteByEmployeeID(employeeID);
        if (!isRemoved) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.noContent().build();
    }
}
