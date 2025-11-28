import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    try {
      await api.post("/api/auth/register", form);
      setMsg("Registration successful! You can now login.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError("Registration failed. Try another username.");
    }
  };

  return (
    <div className="container full-height-center">
      <div className="col-md-4">
        <div className="p-4 glass-card">
          <h3 className="text-white mb-3 text-center">Create an account 🍿</h3>
          <p className="text-light text-center mb-4">
            Join ColorFlix and never miss your favourite shows!
          </p>
          {error && <div className="alert alert-danger">{error}</div>}
          {msg && <div className="alert alert-success">{msg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-white">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
            <button type="submit" className="btn btn-gradient w-100 mt-2">
              Register
            </button>
          </form>
          <p className="text-center text-light mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-white text-decoration-underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
