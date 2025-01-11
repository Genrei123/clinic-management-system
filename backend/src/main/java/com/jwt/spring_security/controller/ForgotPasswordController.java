package com.jwt.spring_security.controller;

import com.jwt.spring_security.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ForgotPasswordController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            usersService.sendResetPasswordEmail(email);
            return ResponseEntity.ok(Map.of("message", "Reset link sent in the e-mail."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "E-mail is not registered."));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        try {
            usersService.resetPassword(token, newPassword);
            return ResponseEntity.ok(Map.of("message", "Password reset successful!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to reset password."));
        }
    }
}