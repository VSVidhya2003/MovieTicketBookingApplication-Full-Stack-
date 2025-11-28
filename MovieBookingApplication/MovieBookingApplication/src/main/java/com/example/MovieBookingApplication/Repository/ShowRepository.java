package com.example.MovieBookingApplication.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.MovieBookingApplication.Entity.Show;


public interface ShowRepository extends JpaRepository<Show, Long> {}