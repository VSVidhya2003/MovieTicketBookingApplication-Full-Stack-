package com.example.MovieBookingApplication.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MovieBookingApplication.Entity.Theatre;
import com.example.MovieBookingApplication.Repository.TheatreRepository;

@RestController
@RequestMapping("/api/admin/theatres")

public class AdminTheatreController {

    @Autowired
    TheatreRepository theatreRepo;

    @PostMapping
    public Theatre addTheatre(@RequestBody Theatre theatre) {
        return theatreRepo.save(theatre);
    }
}
