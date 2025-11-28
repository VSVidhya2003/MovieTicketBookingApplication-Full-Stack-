package com.example.MovieBookingApplication.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.MovieBookingApplication.Entity.Theatre;
import com.example.MovieBookingApplication.Service.TheatreService;

@RestController
@RequestMapping("/api/theatres")
public class TheatreController {

    @Autowired
    private TheatreService theatreService;

    @PostMapping
    public Theatre addTheatre(@RequestBody Theatre theatre) {
        return theatreService.addTheatre(theatre);
    }

    @GetMapping
    public List<Theatre> getAll() {
        return theatreService.getAllTheatres();
    }

    @GetMapping("/{id}")
    public Theatre getById(@PathVariable Long id) {
        return theatreService.getTheatreById(id);
    }
}
