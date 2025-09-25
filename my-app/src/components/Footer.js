// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-items">
          <h2>Careers</h2>
          <Link to="/job-openings">Job Openings</Link>
          <Link to="/internships">Internships</Link>
        </div>

        <div className="footer-link-items">
          <h2>Contact Us</h2>
          <Link to="/contact-us">Contact</Link>
          <p>Email: <a href="mailto:mradenterprisespvtltd@gmail.com">mradenterprisespvtltd@gmail.com</a></p>

          <p>Phone: <a href="tel:+919496177336">+91 94961 77336</a></p>
        </div>

        <div className="footer-link-items">
          <h2>Location</h2>
          <p>
            378, Palimattom House <br />
            Mookkannur, Ernakulam <br />
            Aluva, Kerala, India <br />
            683577
          </p>
        </div>

        <div className="footer-link-items">
          <h2>Privacy</h2>
          <Link to="/privacy">Privacy Statement</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/cookies">Cookie Policy / Settings</Link>
        </div>

        <div className="footer-link-items">
          <h2>Social Media</h2>
          <Link to="/">Instagram</Link>
          <Link to="/">Facebook</Link>
          <Link to="/">Youtube</Link>
        </div>
      </div>

      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">MRaD</Link>
          </div>
          <small className="website-rights">MRaD © 2025</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
