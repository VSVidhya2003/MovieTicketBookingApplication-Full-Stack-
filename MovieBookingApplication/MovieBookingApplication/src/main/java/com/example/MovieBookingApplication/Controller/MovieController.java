package com.example.MovieBookingApplication.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.MovieBookingApplication.DTO.MovieDTO;
import com.example.MovieBookingApplication.Entity.Movie;
import com.example.MovieBookingApplication.Service.MovieService;

@RestController
@RequestMapping("/api/movies")

public class MovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping
    public Movie add(@RequestBody MovieDTO dto) {
        return movieService.addMovie(dto);
    }

    @GetMapping
    public List<Movie> all() {
        return movieService.getAll();
    }

    @GetMapping("/{id}")
    public Movie get(@PathVariable Long id) {
        return movieService.getById(id);
    }
}
