// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import Products from "./components/pages/Products";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import UsersPage from "./components/pages/UsersPage";
import EmployeesPage from "./components/pages/EmployeesPage";
import AdminMessages from "./components/pages/AdminMessages";
import JobOpenings from "./components/pages/JobOpenings";
import Internships from "./components/pages/Internships";
import ContactUs from "./components/pages/ContactUs";
import PrivacyStatement from "./components/pages/PrivacyStatement";
import TermsAndConditions from "./components/pages/TermsAndConditions";
import CookiePolicy from "./components/pages/CookiePolicy";
import CookiePopup from "./components/pages/CookiePopup";
import VideoPlayer from "./components/VideoPlayer";

/**
 * ProtectedRoute
 * - `roles` can be a single string like "admin" or an array like ["admin","employee"]
 * - Checks both token presence and role match
 * - Redirects to /login preserving attempted location in state
 */
const ProtectedRoute = ({ roles, children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRoleRaw = localStorage.getItem("role") || "";
  const userRole = userRoleRaw.toLowerCase();

  // Normalize roles to array of lowercase strings
  const allowed = Array.isArray(roles) ? roles : [roles];
  const allowedLower = allowed.map((r) => (r || "").toLowerCase());

  // Not authenticated
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles wasn't provided (no role restriction), allow authenticated users
  if (!roles) return children;

  // Check role match
  if (allowedLower.includes(userRole)) return children;

  // Forbidden — redirect to login (or you can redirect to a "Forbidden" page)
  return <Navigate to="/login" state={{ from: location }} replace />;
};

function App() {
  return (
    <Router>
      <VideoPlayer />
      <Navbar />
      <CookiePopup />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute roles="user">
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute roles={["employee", "admin"]}>
              <EmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute roles="admin">
              <AdminMessages />
            </ProtectedRoute>
          }
        />

        <Route path="/job-openings" element={<JobOpenings />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy" element={<PrivacyStatement />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/cookies" element={<CookiePolicy />} />

        {/* Catch-all — redirect unknown routes to home (can be replaced with a 404 component) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
