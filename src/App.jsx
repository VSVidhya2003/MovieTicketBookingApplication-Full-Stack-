import React from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MoviesPage from "./pages/MoviesPage";
import BookingPage from "./pages/BookingPage";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddMovie from "./pages/admin/AddMovie";
import AddTheatre from "./pages/admin/AddTheatre";
import AddShow from "./pages/admin/AddShow";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// ONLY ADMIN CAN ACCESS THESE ROUTES
// ONLY ADMIN CAN ACCESS THESE ROUTES
const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  return isAuthenticated && role === "ADMIN"
    ? children
    : <Navigate to="/movies" replace />;
};


const AppInner = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/movies" replace />} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* USER ROUTES */}
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <MoviesPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <PrivateRoute>
              <BookingPage />
            </PrivateRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-movie"
          element={
            <AdminRoute>
              <AddMovie />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-theatre"
          element={
            <AdminRoute>
              <AddTheatre />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-show"
          element={
            <AdminRoute>
              <AddShow />
            </AdminRoute>
          }
        />

        {/* DEFAULT ROUTE */}
        <Route path="*" element={<Navigate to="/movies" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  // Set token for all axios requests
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </AuthProvider>
  );
};


export default App;
