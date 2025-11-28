import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Manage movies, theatres, and shows here</p>

      <div className="admin-buttons">
        <Link to="/admin/add-movie" className="admin-btn">Add / View Movies</Link>
        <Link to="/admin/add-theatre" className="admin-btn">Add / View Theatres</Link>
        <Link to="/admin/add-show" className="admin-btn">Add / View Shows</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
