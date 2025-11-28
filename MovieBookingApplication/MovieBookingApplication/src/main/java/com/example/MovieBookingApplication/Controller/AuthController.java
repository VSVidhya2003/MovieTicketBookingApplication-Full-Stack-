package com.example.MovieBookingApplication.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map; // <-- ADD THIS

import com.example.MovieBookingApplication.DTO.AuthRequestDTO;
import com.example.MovieBookingApplication.DTO.AuthResponseDTO;
import com.example.MovieBookingApplication.Entity.User;
import com.example.MovieBookingApplication.Repository.UserRepository;
import com.example.MovieBookingApplication.Security.JwtUtil;
import com.example.MovieBookingApplication.Service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody AuthRequestDTO dto) {
        if (userRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        User u = new User();
        u.setUsername(dto.getUsername());
        u.setPassword(dto.getPassword());
        userService.register(u);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody AuthRequestDTO dto) {
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        return new AuthResponseDTO(token, user.getUsername(), user.getRole());
    }

}
