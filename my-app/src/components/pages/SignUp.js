import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function SignUp() {
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
      // 🔹 Call backend directly on port 5000
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("✅ Signup successful!");
      console.log("Server response:", res.data);
      window.location.href = "/login";
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.error || err.message || "❌ Error signing up!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account 🚀</h2>
        <p>Sign up to get started</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
              <option value="guest">Guest</option>
            </select>
          </div>
          <button type="submit" className="btn-auth">Sign Up</button>
        </form>
        <p className="toggle-text">
          Already have an account?{" "}
          <a href="/login" className="auth-link">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
