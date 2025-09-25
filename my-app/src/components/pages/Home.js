import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import CookiePopup from './CookiePopup'; // ✅ make sure path is correct
import './Home.css';

function Home() {
  return (
    <>
      <HeroSection />

      <section id="about" className="about-section">
        <h2 className="about-title">About Us</h2>
        <p>
          <strong>MRAD ENTERPRISES PRIVATE LIMITED</strong> (CIN: U62013KL2024PTC091216) 
          is a fast-growing private company incorporated on <b>27th December, 2024</b>.  
          With a vision to drive innovation in software and embedded technologies, 
          MRAD Enterprises is actively involved in providing high-quality 
          <b> software support, maintenance, and cutting-edge technology solutions</b> 
          for clients across industries.
        </p>

        <div className="about-details">
          <p><strong>Incorporation Age:</strong> 8 months & 21 days (as of 29-07-2025)</p>
          <p><strong>Authorized Share Capital:</strong> ₹15,00,000</p>
          <p><strong>Paid-up Capital:</strong> ₹1,00,000</p>
          <p><strong>Directors:</strong> JOSEPH P JOSEPH, DILNA KAYANADATH</p>
          <p><strong>Registered Office:</strong> 378, Palimattom House, Mookkannur, Ernakulam, Aluva, Kerala, India, 683577</p>
        </div>

        <p className="about-footer">
          We specialize in <b>
            software support, embedded solutions, AI/ML works, UI/UX design, web & app development, 
            PLC design, and technical training programs
          </b> for colleges and industry professionals.
        </p>
      </section>

      <CookiePopup /> {/* ✅ Cookie popup */}
    </>
  );
}

export default Home;
