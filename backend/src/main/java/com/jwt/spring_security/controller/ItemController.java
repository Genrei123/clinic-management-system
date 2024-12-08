package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Branch;
import com.jwt.spring_security.model.Item;
import com.jwt.spring_security.repo.ItemRepo;
import com.jwt.spring_security.service.ItemService;
import com.jwt.spring_security.service.BranchService;
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
    private BranchService branchService;
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
    public ResponseEntity<Item> addItems(@RequestBody Item item) {
        Branch branchExists = branchRepo.findByBranchID(item.getBranch().getBranchID());
        if (branchExists == null) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }
        item.setBranch(branchExists);
        Item savedItem = itemRepo.save(item);
        return ResponseEntity.ok(savedItem); // 200 OK
    }


    @PostMapping("/addItems")
    public ResponseEntity<List<Item>> addItems(@RequestBody List<Item> items) {
        if (items.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.emptyList()); // 400 Bad Request
        }
        Long branchId = items.get(0).getBranch().getBranchID();
        Branch branch = branchRepo.findByBranchID(branchId);
        if (branch == null) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }
        items.forEach(item -> item.setBranch(branch));
        List<Item> savedItems = itemRepo.saveAll(items);
        return ResponseEntity.ok(savedItems); // 200 OK
    }



    @PutMapping("/updateItems/{id}")
    public ResponseEntity<Item> updateItems(@PathVariable Long id, @RequestBody Item itemDetails) {
        Item existingItem = itemRepo.findByItemID(id);
        if (existingItem == null) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
        // Update properties
        existingItem.setItemName(itemDetails.getItemName());
        existingItem.setItemQuantity(itemDetails.getItemQuantity());
        existingItem.setItemPrice(itemDetails.getItemPrice());
        existingItem.setManufactureDate(itemDetails.getManufactureDate());
        existingItem.setExpDate(itemDetails.getExpDate());
        existingItem.setStatus(itemDetails.getStatus());
        existingItem.setBranch(itemDetails.getBranch());

        Item updatedItem = itemRepo.save(existingItem);
        return ResponseEntity.ok(updatedItem); // 200 OK
    }


    @DeleteMapping("/deleteItems/{id}")
    public boolean deleteItems(@PathVariable Long id) {
        return itemService.deleteByItemID(id);
    }
}
