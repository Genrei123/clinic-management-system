package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.model.UserPrincipal;
import com.jwt.spring_security.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.jwt.spring_security.exception.model.ApiErrorResponse;

import java.util.List;
import java.util.Optional;

@RestController
@Validated
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/addEmployee")
    public ResponseEntity<?> addEmployee(@RequestBody @Validated Employee employee) {
        if (employeeService.existsByEmployeeID(employee.getEmployeeID())) {
            return ResponseEntity.badRequest()
                    .body(new ApiErrorResponse("Validation Error", "Employee ID already exists " + employee, employee));
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
    public ResponseEntity<?> getEmployee(@PathVariable Long employeeID) {  // Ensure employeeID is Long
        Employee employee = employeeService.findByEmployeeID(employeeID);  // Ensure this method uses Long
        if (employee == null) {
            return ResponseEntity.status(404)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/updateEmployee/{employeeID}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long employeeID, @RequestBody @Validated Employee employeeDetails) {  // Ensure employeeID is Long
        Employee updatedEmployee = employeeService.updateEmployee(employeeID, employeeDetails);  // Ensure this method uses Long
        if (updatedEmployee == null) {
            return ResponseEntity.status(404)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/deleteEmployee/{employeeID}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long employeeID) {  // Ensure employeeID is Long
        boolean isRemoved = employeeService.deleteByEmployeeID(employeeID);  // Ensure this method uses Long
        if (!isRemoved) {
            return ResponseEntity.status(404)
                    .body(new ApiErrorResponse("Not Found", "Employee with ID " + employeeID + " not found", employeeID));
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/employees/me")
    public ResponseEntity<?> getCurrentEmployee() {
        // Get the Authentication object from SecurityContext
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserPrincipal) {
            UserPrincipal userPrincipal = (UserPrincipal) principal;

            // Retrieve the user ID from the UserPrincipal object
            Long userId = userPrincipal.getUserId();  // Ensure this is Long, not String

            // Fetch the employee by ID
            Optional<Employee> employee = employeeService.findByID(userId);  // Ensure your service method accepts Long
            if (!employee.isPresent()) {
                return ResponseEntity.status(404)
                        .body(new ApiErrorResponse("Not Found", "Employee not found for user ID " + userId, userId));
            }

            // Update the login timestamp when employee is fetched
            employeeService.saveLoginTimestamp(employee.get().getEmployeeID());  // Assuming employeeID is Long

            return ResponseEntity.ok(employee.get());  // Return the employee details
        }

        return ResponseEntity.status(401).body(new ApiErrorResponse("Unauthorized", "Invalid user session", null));
    }
}
