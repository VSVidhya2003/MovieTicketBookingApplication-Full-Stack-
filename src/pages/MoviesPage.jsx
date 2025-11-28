import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/api/movies");
        setMovies(res.data);
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleBook = (movie) => {
    navigate(`/booking`, { state: { movieId: movie.id, movie } });
  };

  if (loading) {
    return (
      <div className="container full-height-center">
        <div className="text-white">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container full-height-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container pb-5">
      <h2 className="text-white mb-4">Now Showing 🎥</h2>
      <div className="row g-4">
        {movies.map((movie) => (
          <div className="col-md-4" key={movie.id}>
            <div className="card movie-card glass-card text-white h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">
                  <span className="badge-soft me-2">{movie.genre}</span>
                  <span className="badge-soft">
                    {movie.duration} mins · {movie.language}
                  </span>
                </p>
                <p className="card-text" style={{ fontSize: "0.9rem" }}>
                  {movie.description}
                </p>
                <p className="card-text mt-auto">
                  <small className="text-light">
                    Release date: {movie.releaseDate || "N/A"}
                  </small>
                </p>
                <button
                  className="btn btn-gradient w-100 mt-2"
                  onClick={() => handleBook(movie)}
                >
                  Book Tickets
                </button>
              </div>
            </div>
          </div>
        ))}
        {movies.length === 0 && (
          <div className="text-white">No movies found. Add some via backend.</div>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
