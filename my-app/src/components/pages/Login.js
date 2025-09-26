// src/components/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // ✅ corrected path
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      if (!token || !user) {
        alert("Login failed. Please try again.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role.toLowerCase());
      localStorage.setItem("userId", user.id);

      const userRole = user.role.toLowerCase();
      if (userRole === "admin") navigate("/admin/messages");
      else if (userRole === "employee") navigate("/employees");
      else navigate("/users");
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      alert(err.response?.data?.error || "Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="/sign-up">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
