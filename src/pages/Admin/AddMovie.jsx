import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext"; // adjust path if needed

function AddMovie() {
  const { token } = useAuth();

  const [movie, setMovie] = useState({
    name: "",
    genre: "",
    language: "",
    duration: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8081/api/admin/movies", movie, {
      headers: {
        Authorization: `Bearer ${token}`, // VERY IMPORTANT 🔥
      },
    });

    alert("Movie added successfully!");
    setMovie({ name: "", genre: "", language: "", duration: 0 });
  };

  return (
    <div className="container mt-4">
      <h2>Add Movie</h2>

      <form onSubmit={handleSubmit} className="mt-3">
        <input
          className="form-control mb-2"
          placeholder="Movie name"
          value={movie.name}
          onChange={(e) => setMovie({ ...movie, name: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Genre"
          value={movie.genre}
          onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Language"
          value={movie.language}
          onChange={(e) => setMovie({ ...movie, language: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Duration"
          type="number"
          value={movie.duration}
          onChange={(e) => setMovie({ ...movie, duration: e.target.value })}
        />

        <button className="btn btn-primary w-100">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;
