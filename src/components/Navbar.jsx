import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { isAuthenticated, username, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom mb-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          🎬 <span className="ms-2">ColorFlix</span>
        </Link>

        <div id="navContent" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/movies">Movies</Link>
              </li>
            )}

            {/** 👑 SHOW ADMIN PANEL ONLY IF ROLE = ADMIN */}
            {isAuthenticated && role === "ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Panel</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    👋 Hi, <strong>{username}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-light ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-sm btn-gradient ms-2" to="/register">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
