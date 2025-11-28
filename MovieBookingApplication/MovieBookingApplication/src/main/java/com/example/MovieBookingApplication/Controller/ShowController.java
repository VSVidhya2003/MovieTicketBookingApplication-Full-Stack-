package com.example.MovieBookingApplication.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.MovieBookingApplication.Entity.Show;
import com.example.MovieBookingApplication.Service.ShowService;
import com.example.MovieBookingApplication.Service.SeatService;

@RestController
@RequestMapping("/api/shows")

public class ShowController {

    @Autowired
    private ShowService showService;

    @Autowired
    private SeatService seatService;

    @PostMapping("/add/{movieId}/{theatreId}")
    public Show addShow(
            @PathVariable Long movieId,
            @PathVariable Long theatreId,
            @RequestBody Show show) {

        // save show
        Show savedShow = showService.addShow(movieId, theatreId, show);

        // generate seats
        seatService.generateSeatsForShow(savedShow);

        return savedShow;
    }

    @GetMapping
    public List<Show> getAll() {
        return showService.getAllShows();
    }

    @GetMapping("/{id}")
    public Show getById(@PathVariable Long id) {
        return showService.getShowById(id);
    }
}
