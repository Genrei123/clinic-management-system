package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.model.Patient;
import com.jwt.spring_security.model.UserPrincipal;
import com.jwt.spring_security.repo.EmployeeRepo;
import com.jwt.spring_security.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import com.jwt.spring_security.exception.model.ApiErrorResponse;
import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@Validated
public class EmployeeController {

    @Value("${imgur.client_id}")
    private String imgurClientId;

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeRepo employeeRepo;

    @PostMapping("/addEmployee")
    public ResponseEntity<?> addEmployee(@RequestBody Employee employee) {
        // Check if employeeID already exists
        if (employeeService.existsByEmployeeID(employee.getEmployeeID())) {
            return ResponseEntity.badRequest()
                    .body(new ApiErrorResponse("Validation Error", "Employee ID already exists", employee.getEmployeeID()));
        }

        // Check if email already exists
        if (employeeService.existsByEmail(employee.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new ApiErrorResponse("Validation Error", "Email already in use", employee.getEmail()));
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

    @GetMapping("/employees/me")
    public ResponseEntity<?> getCurrentEmployee() {
        // Get the Authentication object from SecurityContext
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserPrincipal) {
            UserPrincipal userPrincipal = (UserPrincipal) principal;

            // Retrieve the user ID from the UserPrincipal object
            Long userId = userPrincipal.getUserId(); // Assuming getUserId() is a method in your UserPrincipal class

            // Fetch the employee by ID
            Optional<Employee> employee = employeeService.findByID(userId);
            if (employee == null) {
                return ResponseEntity.status(404)
                        .body(new ApiErrorResponse("Not Found", "Employee not found" + userId, userId));
            }

            return ResponseEntity.ok(employee);
        }

        return ResponseEntity.status(401).body(new ApiErrorResponse("Unauthorized", "Invalid user session", null));
    }

    @PostMapping("/uploadEmployeeImage")
    public ResponseEntity<?> uploadPatientImage(@RequestParam("file") MultipartFile file,
                                                @RequestParam("employeeId") int employeeId) {
        try {
            // Check if patient exists
            Employee employee = employeeRepo.findByEmployeeID(employeeId);

            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("No file was uploaded.");
            }

            // Upload the file to Imgur
            String imageUrl = uploadImageToImgur(file);
            if (imageUrl == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload to Imgur.");
            }

            // Save the returned image URL in the patient record
            employee.setImagePath(imageUrl);
            employeeRepo.save(employee);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Image uploaded successfully");
            response.put("imagePath", imageUrl);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image: " + e.getMessage());
        }
    }

    private String uploadImageToImgur(MultipartFile file) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            headers.set("Authorization", "Client-ID " + imgurClientId);

            // Build the body
            MultiValueMap<String, Object> body = new org.springframework.util.LinkedMultiValueMap<>();
            body.add("image", new org.springframework.core.io.ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            });

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            // Imgur Upload Endpoint
            ResponseEntity<Map> response = restTemplate.exchange(
                    "https://api.imgur.com/3/image",
                    HttpMethod.POST,
                    requestEntity,
                    Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> data = (Map<String, Object>) response.getBody().get("data");
                if (data != null && data.get("link") != null) {
                    return data.get("link").toString();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}

