package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Item;
import com.jwt.spring_security.model.Patient;
import com.jwt.spring_security.model.Users;
import com.jwt.spring_security.model.Visit;
import com.jwt.spring_security.repo.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class OwnerController {

    @Autowired
    private VisitRepository visitRepository;

    @GetMapping("/generateReport")
    public List<Visit> viewClinicReport() {
        return visitRepository.findAll();
    }

    public Item addItem(Users user, String itemName, String itemDescription, Long itemQuantity, Date expDate) {
        // TODO
        return null;
    }

    public Item viewItem(Long itemID) {
        // TODO
        return null;
    }

    public Item deleteItem(Long itemID) {
        // TODO
        return null;
    }

    public Item updateItem(Long itemID, Item itemDetails) {
        // TODO
        return null;
    }
}
