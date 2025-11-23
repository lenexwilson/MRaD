// src/components/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // axios instance with baseURL '/api'
import "./Login.css";

/**
 * Login component
 * - Uses relative API calls via the `api` axios instance (baseURL '/api')
 * - Stores token, role and userId on successful login
 * - Handles cases where backend returns user._id instead of user.id
 */
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // relative path -> will call /api/auth/login (proxied by nginx in production)
      const res = await api.post("/auth/login", { email, password });

      // backend returns { user, token }
      const { token, user } = res.data || {};

      if (!token || !user) {
        alert("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // user id can be _id (Mongo) or id — handle both
      const userId = user._id || user.id || user.userId || null;

      localStorage.setItem("token", token);
      if (user.role) localStorage.setItem("role", user.role.toLowerCase());
      if (userId) localStorage.setItem("userId", userId);

      // Optional: set Authorization header for future requests in this session
      // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userRole = (user.role || "").toLowerCase();
      if (userRole === "admin") navigate("/admin/messages");
      else if (userRole === "employee") navigate("/employees");
      else navigate("/users");
    } catch (err) {
      // Prefer backend error message if available
      const message = err?.response?.data?.error || err?.message || "Invalid credentials!";
      console.error("Login error:", err?.response?.data || err);
      alert(message);
    } finally {
      setLoading(false);
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
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
            autoComplete="current-password"
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
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
