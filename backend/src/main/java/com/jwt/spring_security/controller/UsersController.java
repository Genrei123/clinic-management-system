package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Users;
import com.jwt.spring_security.repo.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {

    @Autowired
    UsersService usersService;

    @PostMapping("/register")
    public Users registerUser(@RequestBody Users user) {
        return usersService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
        System.out.println("User: " + user);
        String token = usersService.verify(user);
        UserResponse loginResponse = new UserResponse(user, token);
        return ResponseEntity.ok(loginResponse);
    }




}
