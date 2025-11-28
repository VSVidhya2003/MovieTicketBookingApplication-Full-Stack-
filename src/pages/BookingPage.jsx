import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";

const BookingPage = () => {
  const location = useLocation();
  const movieFromState = location.state?.movie;
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await api.get("/api/shows");
        setShows(res.data);
      } catch (err) {
        setError("Failed to load shows");
      }
    };
    fetchShows();
  }, []);

  const handleShowChange = async (e) => {
    const showId = e.target.value;
    setSelectedShow(showId);
    setSelectedSeatIds([]);
    setSeats([]);

    if (!showId) return;

    try {
      const res = await api.get(`/api/shows/${showId}`);
      setSeats(res.data.seats || []);
    } catch (err) {
      setError("Failed to load seats for this show");
    }
  };

  const toggleSeat = (seat) => {
    if (seat.booked) return;
    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seat.id));
    } else {
      setSelectedSeatIds([...selectedSeatIds, seat.id]);
    }
  };

  const handleBook = async () => {
    setMsg("");
    setError("");
    if (!selectedShow || selectedSeatIds.length === 0) {
      setError("Please select a show and at least one seat");
      return;
    }

    try {
      const payload = {
        showId: Number(selectedShow),
        seatIds: selectedSeatIds,
      };
      const res = await api.post("/api/bookings/book", payload);
      setMsg(`Booking confirmed! Booking ID: ${res.data.id}`);
    } catch (err) {
      setError("Booking failed. Some seats may already be booked.");
    }
  };

  return (
    <div className="container pb-5">
      <div className="glass-card p-4 mt-3">
        <h3 className="text-white mb-3">Book Tickets 🎟️</h3>
        {movieFromState && (
          <p className="text-light">
            Movie: <strong>{movieFromState.name}</strong> ·{" "}
            <span className="badge-soft">{movieFromState.genre}</span>
          </p>
        )}

        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {msg && <div className="alert alert-success mt-2">{msg}</div>}

        <div className="row mt-3">
          <div className="col-md-4">
            <label className="form-label text-white">Select Show</label>
            <select
              className="form-select"
              value={selectedShow || ""}
              onChange={handleShowChange}
            >
              <option value="">-- choose show --</option>
              {shows.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.showDate} · {s.showTime} · Theatre #{s.theatre?.id}
                </option>
              ))}
            </select>
          </div>
        </div>

        {seats.length > 0 && (
          <div className="mt-4">
            <h5 className="text-white mb-3">Select Seats</h5>
            <div className="d-flex flex-wrap">
              {seats.map((seat) => {
                const isSelected = selectedSeatIds.includes(seat.id);
                const seatClass = seat.booked
                  ? "seat-pill seat-booked"
                  : isSelected
                  ? "seat-pill seat-selected"
                  : "seat-pill seat-free";

                return (
                  <div
                    key={seat.id}
                    className={seatClass}
                    onClick={() => toggleSeat(seat)}
                  >
                    {seat.seatNumber}
                  </div>
                );
              })}
            </div>
            <button
              className="btn btn-gradient mt-4"
              onClick={handleBook}
              disabled={selectedSeatIds.length === 0}
            >
              Confirm Booking ({selectedSeatIds.length} seats)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
