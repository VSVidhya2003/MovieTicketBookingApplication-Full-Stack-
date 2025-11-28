import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (token && storedUser && storedRole) {
      setIsAuthenticated(true);
      setUsername(storedUser);
      setRole(storedRole);
    }
  }, []);

  const login = (token, user, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", user);
    localStorage.setItem("role", userRole);

    setIsAuthenticated(true);
    setUsername(user);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUsername(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
