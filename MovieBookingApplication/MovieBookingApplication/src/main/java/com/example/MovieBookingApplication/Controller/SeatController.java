package com.example.MovieBookingApplication.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.MovieBookingApplication.Entity.Seat;
import com.example.MovieBookingApplication.Service.SeatService;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @GetMapping("/show/{showId}")
    public List<Seat> getSeats(@PathVariable Long showId) {
        return seatService.getSeatsForShow(showId);
    }
}
