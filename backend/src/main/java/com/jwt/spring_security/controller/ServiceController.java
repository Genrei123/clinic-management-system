package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.*;
import com.jwt.spring_security.repo.ItemRepo;
import com.jwt.spring_security.repo.PatientRepo;
import com.jwt.spring_security.repo.RenderedServiceRepository;
import com.jwt.spring_security.repo.ServiceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/service")
public class ServiceController {

    @Autowired
    private RenderedServiceRepository renderedServiceRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private ServiceRepository servicesRepo;


    @PostMapping("/addService")
    public ResponseEntity<?> addService(@RequestBody Services services) {
        try {
            serviceRepository.save(services);
            return ResponseEntity.ok("Service added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getServices")
    public ResponseEntity<?> getServices() {
        try {
            return ResponseEntity.ok(serviceRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteService/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        try {
            serviceRepository.deleteById(id);
            return ResponseEntity.ok("Service deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/updateService")
    public ResponseEntity<?> updateService(@RequestBody Services services) {
        try {
            serviceRepository.save(services);
            return ResponseEntity.ok("Service updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @Transactional
    @PostMapping("/renderService")
    public ResponseEntity<?> renderService(@RequestBody RenderedService request) {
        try {
            System.out.println("Received RenderedService: " + request);

            // Validate and fetch patient details
            Patient patient = request.getPatient();
            if (patient == null || patient.getPatientID() == null) {
                return ResponseEntity.badRequest().body("Patient information is required.");
            }

            Patient existingPatient = patientRepo.findByPatientID(patient.getPatientID())
                    .orElseThrow(() -> new RuntimeException("Patient not found: " + patient.getPatientID()));

            // Validate and fetch services
            List<Services> services = request.getServices();
            if (services == null || services.isEmpty()) {
                return ResponseEntity.badRequest().body("At least one service must be selected.");
            }

            List<Services> managedServices = new ArrayList<>();
            for (Services service : services) {
                if (service.getServiceID() == null) {
                    return ResponseEntity.badRequest().body("Service ID cannot be null.");
                }
                Services existingService = servicesRepo.findById(service.getServiceID())
                        .orElseThrow(() -> new RuntimeException("Service not found: " + service.getServiceID()));
                managedServices.add(existingService);
            }

            // Validate and update item quantities (if applicable)
            List<Item> items = request.getItems();
            if (items != null) {
                for (Item item : items) {
                    System.out.println("Processing Item: ID = " + item.getItemID());
                    if (item.getItemID() == null) {
                        return ResponseEntity.badRequest().body("Item ID cannot be null.");
                    }

                    Item existingItem = itemRepo.findByItemID(item.getItemID());
                    if (existingItem == null) {
                        return ResponseEntity.badRequest().body("Item not found: " + item.getItemID());
                    }
                    if (existingItem.getItemQuantity() == null || item.getItemQuantity() == null) {
                        return ResponseEntity.badRequest().body("Item quantities must not be null.");
                    }
                    if (existingItem.getItemQuantity() < item.getItemQuantity()) {
                        return ResponseEntity.badRequest().body("Insufficient stock for item: " + existingItem.getItemName());
                    }

                    // Update the quantity
                    System.out.println("Before update: Item ID = " + existingItem.getItemID() + ", Quantity = " + existingItem.getItemQuantity());
                    existingItem.setItemQuantity(existingItem.getItemQuantity() - item.getItemQuantity());
                    System.out.println("Updated Quantity in Object: " + existingItem.getItemQuantity());

                    // Save and flush the item to ensure persistence
                    itemRepo.saveAndFlush(existingItem);
                    System.out.println("After saveAndFlush: Item ID = " + existingItem.getItemID() + ", Quantity = " + existingItem.getItemQuantity());
                }
            }


            // Save rendered service details
            RenderedService renderedService = new RenderedService();
            renderedService.setPatient(existingPatient);
            renderedService.setServices(managedServices);
            renderedService.setItems(items);
            renderedService.setTotalCost(request.getTotalCost());
            renderedService.setNotes(request.getNotes());

            RenderedService savedService = renderedServiceRepository.save(renderedService);
            System.out.println("Saved RenderedService ID: " + savedService.getId());

            return ResponseEntity.ok("Service rendered successfully with ID: " + savedService.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }






}

