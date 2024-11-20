package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Users;
import com.jwt.spring_security.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;
import java.util.List;

@RestController
@RequestMapping("/hello")
public class Hello {
    @Autowired
    private UserRepo userrepo ;

    @GetMapping
    public String hello() {
        return "Hello!";
    }

    @GetMapping("/users")
    public List<Users> getUsers() {
        return userrepo.findAll();
    }

    @PostMapping("/addUsers")
    public String addUsers(@RequestBody Users user) {
        userrepo.save(user);
        return "User " + user.getUsername() + " added successfully!";
    }


}
