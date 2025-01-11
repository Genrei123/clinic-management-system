package com.jwt.spring_security.service;

import com.jwt.spring_security.model.Users;
import com.jwt.spring_security.repo.UserRepo;
import com.jwt.spring_security.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UsersService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Get all users
    public Iterable<Users> getAllUsers() {
        return userRepo.findAll();
    }

    public Users registerUser(Users user) {
        // Validate and set role
        if (user.getRole() == null || user.getRole().isEmpty()) {
            throw new IllegalArgumentException("Role must be specified during registration");
        }

        // Ensure role is either ADMIN or EMPLOYEE
        String role = user.getRole().toUpperCase();
        if (!role.equals("ADMIN") && !role.equals("EMPLOYEE")) {
            throw new IllegalArgumentException("Invalid role. Must be ADMIN or EMPLOYEE");
        }

        // Encrypts Password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Saves User
        return userRepo.save(user);
    }

    public String verify(Users user) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        if (authentication.isAuthenticated()) {
            // Fetch the authenticated user from the database to get the full user object
            Users authenticatedUser = userRepo.findByUsername(user.getUsername());

            // Extract roles from authorities with "ROLE_" prefix
            String roles = authentication.getAuthorities().stream()
                    .map(grantedAuthority -> "ROLE_" + grantedAuthority.getAuthority().toUpperCase())
                    .collect(Collectors.joining(","));

            // Generate the JWT token including roles
            String token = jwtService.generateToken(user.getUsername(), roles);

            // Return an object or modify response to include role
            return token;
        } else {
            throw new RuntimeException("User Not Authenticated");
        }
    }

    public Users findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public Users updateUserByUsername(String username, Users userDetails) {
        Users existingUser = userRepo.findByUsername(username);

        if (existingUser != null) {
            existingUser.setUsername(userDetails.getUsername());

            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                String encryptedPassword = passwordEncoder.encode(userDetails.getPassword());
                existingUser.setPassword(encryptedPassword);
            }

            return userRepo.save(existingUser);
        }
        return null;
    }

    public boolean deleteUserByUsername(String username) {
        Users existingUser = userRepo.findByUsername(username);
        if (existingUser != null) {
            userRepo.delete(existingUser);
            return true;
        }
        return false;
    }

    public void sendResetPasswordEmail(String email) {
        logger.info("Password reset request for email: {}", email);
        Users user = userRepo.findByEmail(email);
        if (user == null) {
            logger.error("E-mail not found: {}", email);
            throw new RuntimeException("E-mail is not registered.");
        }

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        userRepo.save(user);

        String resetLink = "http://localhost:5173/reset-password/" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, click the link below:\n" + resetLink);
        mailSender.send(message);

        logger.info("Password reset email sent to: {}", email);
    }

    public void resetPassword(String token, String newPassword) {
        Users user = userRepo.findByResetToken(token);
        if (user == null) {
            throw new RuntimeException("Invalid token.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        userRepo.save(user);
    }
}