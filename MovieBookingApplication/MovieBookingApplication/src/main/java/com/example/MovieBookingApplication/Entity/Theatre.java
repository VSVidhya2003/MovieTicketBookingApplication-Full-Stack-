package com.example.MovieBookingApplication.Entity;


import java.util.List;


import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Theatre {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


private String theatreName;
private String location;


@OneToMany(mappedBy = "theatre")
private List<Show> shows;
}