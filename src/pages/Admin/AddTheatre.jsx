import axios from "axios";
import { useState } from "react";

function AddTheatre() {
  const [theatre, setTheatre] = useState({ theatreName: "", location: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/api/admin/theatres", theatre);
    alert("Theatre added successfully!");
  };

  return (
    <div className="form-container">
      <h2>Add Theatre</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Theatre Name"
          onChange={(e) => setTheatre({ ...theatre, theatreName: e.target.value })} />

        <input placeholder="Location"
          onChange={(e) => setTheatre({ ...theatre, location: e.target.value })} />

        <button>Add Theatre</button>
      </form>
    </div>
  );
}

export default AddTheatre; // <-- THIS WAS MISSING

