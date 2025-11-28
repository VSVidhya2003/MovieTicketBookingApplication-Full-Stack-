package com.example.MovieBookingApplication.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.MovieBookingApplication.Entity.Seat;


public interface SeatRepository extends JpaRepository<Seat, Long> {}