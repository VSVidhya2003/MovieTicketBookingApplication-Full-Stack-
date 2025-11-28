package com.example.MovieBookingApplication.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.MovieBookingApplication.Entity.Theatre;


public interface TheatreRepository extends JpaRepository<Theatre, Long> {}