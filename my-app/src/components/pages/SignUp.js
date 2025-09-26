// src/components/pages/SignUp.js
import React, { useState } from "react";
import api from "../../api"; // ✅ corrected path
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", formData);
      alert("✅ Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "❌ Error signing up!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account 🚀</h2>
        <p>Sign up to get started</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
          </select>
          <button type="submit" className="btn-auth">Sign Up</button>
        </form>
        <p className="toggle-text">
          Already have an account? <a href="/login" className="auth-link">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
