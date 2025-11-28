import React, { useEffect, useState } from "react";
import axios from "axios";

function AddShow() {
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [show, setShow] = useState({
    movie: { id: "" },
    theatre: { id: "" },
    showDate: "",
    showTime: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8081/api/movies").then((res) => setMovies(res.data));
    axios.get("http://localhost:8081/api/theatres").then((res) => setTheatres(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/api/admin/shows", show);
    alert("Show added successfully!");
  };

  return (
    <div className="form-container">
      <h2>Add Show</h2>

      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setShow({ ...show, movie: { id: e.target.value } })}>
          <option>-- Select Movie --</option>
          {movies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setShow({ ...show, theatre: { id: e.target.value } })}>
          <option>-- Select Theatre --</option>
          {theatres.map((t) => (
            <option key={t.id} value={t.id}>
              {t.theatreName}
            </option>
          ))}
        </select>

        <input type="date" onChange={(e) => setShow({ ...show, showDate: e.target.value })} />
        <input type="time" onChange={(e) => setShow({ ...show, showTime: e.target.value })} />

        <button>Add Show</button>
      </form>
    </div>
  );
}

export default AddShow;
