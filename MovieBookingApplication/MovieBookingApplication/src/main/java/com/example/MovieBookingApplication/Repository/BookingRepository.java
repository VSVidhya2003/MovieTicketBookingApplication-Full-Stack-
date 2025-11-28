package com.example.MovieBookingApplication.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.MovieBookingApplication.Entity.Booking;


public interface BookingRepository extends JpaRepository<Booking, Long> {}