import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await axios.post("http://localhost:8081/api/auth/login", {
      username,
      password,
    });

    // role comes as ROLE_ADMIN / ROLE_USER
    const rawRole = response.data.role;
    const cleanRole = rawRole.replace("ROLE_", ""); // ADMIN or USER

    // Save token, username, role
    login(response.data.token, response.data.username, cleanRole);

    // Redirect based on clean role
    if (cleanRole === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/movies");
    }
  } catch (err) {
    setError("Invalid username or password");
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
