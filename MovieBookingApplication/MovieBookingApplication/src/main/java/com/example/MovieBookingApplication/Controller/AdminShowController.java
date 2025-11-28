package com.example.MovieBookingApplication.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MovieBookingApplication.Entity.Show;
import com.example.MovieBookingApplication.Repository.ShowRepository;

@RestController
@RequestMapping("/api/admin/shows")

public class AdminShowController {

    @Autowired
    ShowRepository showRepo;

    @PostMapping
    public Show addShow(@RequestBody Show show) {
        return showRepo.save(show);
    }
}
