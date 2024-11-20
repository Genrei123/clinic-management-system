package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Branch;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class BranchController {
    @Autowired
    private com.jwt.spring_security.repo.branchService branchService;
    @Autowired
    private com.jwt.spring_security.repo.branchRepo branchRepo;

    @PostMapping("/addBranch")
    public Branch addBranch(@RequestBody Branch branch) {
        return branchRepo.save(branch);
    }

    @GetMapping("/branches")
    public List<Branch> getAllBranches() {
        return branchRepo.findAll();
    }

    @GetMapping("/readBranch/{id}")
    public ResponseEntity<Branch> getBranch(@PathVariable Long id) {
        Branch branch = branchRepo.findByBranchID(id);
        if (branch == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(branch);
    }

    @PutMapping("/updateBranch/{id}")
    public ResponseEntity<Branch> updateBranch(@PathVariable Long id, @RequestBody Branch branchDetails) {
        Branch existingBranch = branchRepo.findByBranchID(id);
        if (existingBranch != null) {
            branchDetails.setBranchID(existingBranch.getBranchID());
            return ResponseEntity.ok(branchRepo.save(branchDetails));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteBranch/{id}")
    public ResponseEntity<Void> deleteBranch(@PathVariable Long id) {
        boolean isRemoved = branchService.deleteByBranchID(id);
        if (!isRemoved) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

}
