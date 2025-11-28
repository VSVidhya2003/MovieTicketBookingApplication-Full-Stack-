package com.example.MovieBookingApplication.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MovieBookingApplication.Entity.Seat;
import com.example.MovieBookingApplication.Entity.Show;
import com.example.MovieBookingApplication.Repository.SeatRepository;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    // Generates 20 seats for a show
    public List<Seat> generateSeatsForShow(Show show) {
        List<Seat> seats = new ArrayList<>();

        String[] rows = {"A", "B"};
        int seatsPerRow = 10;

        for (String row : rows) {
            for (int i = 1; i <= seatsPerRow; i++) {
                Seat seat = new Seat();
                seat.setSeatNumber(row + i);
                seat.setBooked(false);
                seat.setShow(show);
                seats.add(seat);
            }
        }

        return seatRepository.saveAll(seats);
    }

    public List<Seat> getSeatsForShow(Long showId) {
        return seatRepository.findAll()
                .stream()
                .filter(seat -> seat.getShow().getId().equals(showId))
                .toList();
    }
}
