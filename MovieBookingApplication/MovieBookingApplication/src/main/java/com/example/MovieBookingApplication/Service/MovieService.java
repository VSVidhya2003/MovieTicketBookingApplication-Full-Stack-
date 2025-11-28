package com.example.MovieBookingApplication.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MovieBookingApplication.DTO.MovieDTO;
import com.example.MovieBookingApplication.Entity.Movie;
import com.example.MovieBookingApplication.Repository.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public Movie addMovie(MovieDTO dto) {
        Movie m = new Movie();
        m.setName(dto.getName());
        m.setDescription(dto.getDescription());
        m.setGenre(dto.getGenre());
        m.setDuration(dto.getDuration());
        m.setReleaseDate(dto.getReleaseDate());
        m.setLanguage(dto.getLanguage());
        return movieRepository.save(m);
    }

    public List<Movie> getAll() {
        return movieRepository.findAll();
    }

    public Movie getById(Long id) {
        return movieRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Movie not found"));
    }
}
