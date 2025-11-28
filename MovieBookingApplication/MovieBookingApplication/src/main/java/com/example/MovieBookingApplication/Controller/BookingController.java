package com.example.MovieBookingApplication.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.MovieBookingApplication.DTO.BookingRequestDTO;
import com.example.MovieBookingApplication.Entity.Booking;
import com.example.MovieBookingApplication.Security.JwtUtil;
import com.example.MovieBookingApplication.Service.BookingService;

@RestController
@RequestMapping("/api/bookings")

public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/book")
    public Booking bookTicket(@RequestBody BookingRequestDTO request,
                              @RequestHeader("Authorization") String authHeader) {

        String username = jwtUtil.extractUsername(authHeader.substring(7));

        return bookingService.bookTickets(username, request);
    }
}
