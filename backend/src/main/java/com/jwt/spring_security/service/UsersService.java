package com.jwt.spring_security.service;

import com.jwt.spring_security.model.Users;
import com.jwt.spring_security.repo.UserRepo;
import com.jwt.spring_security.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;


    public Users registerUser(Users user) {
        // Encrypts Password
        user.setPassword(new BCryptPasswordEncoder(Constants.BCRYPT_STRENGTH).encode(user.getPassword()));

        // Saves User
        userRepo.save(user);
        return user;
    }

    public String verify(Users user) {
        Authentication authentication =
                authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            String encryptedPassword = new BCryptPasswordEncoder(Constants.BCRYPT_STRENGTH).encode(user.getPassword());
            user.setPassword(encryptedPassword);
            return jwtService.generateToken(user.getUsername());
        } else {
            return "User Not Authenticated";
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
                String encryptedPassword = new BCryptPasswordEncoder().encode(userDetails.getPassword());
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
}
