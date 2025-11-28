package com.example.MovieBookingApplication.DTO;

import java.util.List;

public class BookingRequestDTO {

    private Long showId;        // which show is being booked
    private List<Long> seatIds; // which seats user selected

    // -------- Getters & Setters --------

    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
    }

    public List<Long> getSeatIds() {
        return seatIds;
    }

    public void setSeatIds(List<Long> seatIds) {
        this.seatIds = seatIds;
    }
}
