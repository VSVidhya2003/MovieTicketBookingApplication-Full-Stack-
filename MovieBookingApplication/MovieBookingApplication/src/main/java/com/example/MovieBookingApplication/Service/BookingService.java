package com.example.MovieBookingApplication.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.MovieBookingApplication.DTO.BookingRequestDTO;
import com.example.MovieBookingApplication.Entity.*;
import com.example.MovieBookingApplication.Repository.*;

@Service
public class BookingService {

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Booking bookTickets(String username, BookingRequestDTO request) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Show show = showRepository.findById(request.getShowId())
                .orElseThrow(() -> new RuntimeException("Show not found"));

        List<Seat> seats = seatRepository.findAllById(request.getSeatIds());

        for (Seat seat : seats) {
            if (seat.isBooked()) {
                throw new RuntimeException("Seat already booked: " + seat.getSeatNumber());
            }
            seat.setBooked(true);
        }

        seatRepository.saveAll(seats);

        Booking booking = new Booking();
        booking.setShow(show);
        booking.setUser(user);
        booking.setSeats(seats);
        booking.setBookingDate(LocalDate.now());  // ✔ FIXED
        booking.setTotalAmount(seats.size() * 150);
        booking.setStatus(BookingStatus.CONFIRMED);

        return bookingRepository.save(booking);
    }
}
