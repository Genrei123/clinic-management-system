package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Branch;
import com.jwt.spring_security.model.Item;
import com.jwt.spring_security.repo.ItemRepo;
import com.jwt.spring_security.repo.ItemService;
import com.jwt.spring_security.repo.branchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class ItemController {

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private ItemService itemService;

    @Autowired
    private branchService branchService;
    @Autowired
    private com.jwt.spring_security.repo.branchRepo branchRepo;

    @GetMapping("/items")
    public List<Item> getItems() {
        return itemRepo.findAll();
    }

    @GetMapping("/items/{id}")
    public Item getItem(@PathVariable Long id) {
        return itemRepo.findByItemID(id);
    }

    @PostMapping("/addItem")
    public Item addItems(@RequestBody Item item) {
        Branch branchExists = branchRepo.findByBranchID(item.getBranch().getBranchID());
        if (branchExists != null) {
            item.setBranch(branchExists);
            return itemRepo.save(item);
        }
        return null;

    }

    @PostMapping("/addItems")
    public List<Item> addItems(@RequestBody List<Item> items) {
        if (items.isEmpty()) {
            return Collections.emptyList();
        }

        // Retrieve the branch from the first item (all items are assumed to belong to the same branch)
        Long branchId = items.get(0).getBranch().getBranchID();
        Branch branch = branchRepo.findById(branchId).orElseThrow(() ->
                new IllegalArgumentException("Branch with ID " + branchId + " not found"));

        // Set the branch for each item
        items.forEach(item -> item.setBranch(branch));

        // Save all items in a single batch operation
        return itemRepo.saveAll(items);
    }


    @PostMapping("/updateItems/{id}")
    public Item updateItems(@RequestBody Item item) {
        Item itemExists = itemRepo.findByItemID(item.getItemID());

        if (itemExists != null) {
            item.setItemID(itemExists.getItemID());
            return itemRepo.save(item);
        }

        return null;
    }

    @DeleteMapping("/deleteItems/{id}")
    public boolean deleteItems(@PathVariable Long id) {
        return itemService.deleteByItemID(id);
    }
}
