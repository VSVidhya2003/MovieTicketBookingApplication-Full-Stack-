package com.example.MovieBookingApplication.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.MovieBookingApplication.Entity.Movie;


public interface MovieRepository extends JpaRepository<Movie, Long> {}