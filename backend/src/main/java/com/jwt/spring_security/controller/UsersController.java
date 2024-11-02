package com.jwt.spring_security.controller;

import com.jwt.spring_security.model.Users;
import com.jwt.spring_security.repo.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/read/{username}")
    public ResponseEntity<Users> readByUsername(@PathVariable String username) {
        Users user = usersService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/{username}")
    public ResponseEntity<Users> updateUser(@PathVariable String username, @RequestBody Users userDetails) {
        Users updatedUser = usersService.updateUserByUsername(username, userDetails);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        boolean isRemoved = usersService.deleteUserByUsername(username);
        if (!isRemoved) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }


}
