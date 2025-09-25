import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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

// Role-based route wrapper
const ProtectedRoute = ({ role, children }) => {
  const userRole = localStorage.getItem("role");
  return userRole === role ? children : <Navigate to="/login" />;
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
            <ProtectedRoute role="user">
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute role="employee">
              <EmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute role="admin">
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
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
