import React from 'react';
import '../../App.css';
import './Services.css';

function Services() {
  return (
    <section id="services" className="services-section">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">

        <div className="service-card">
          <img src="/jetson.jpg" alt="Jetson Xavier NX" />
          <h3>Jetson Xavier NX & IMX415 Camera</h3>
          <p>Support for the company’s projects using NVIDIA Jetson Xavier NX and IMX415 camera modules.</p>
        </div>

        <div className="service-card">
          <img src="/debugging.jpg" alt="Debugging" />
          <h3>Debugging & Troubleshooting</h3>
          <p>Quick identification and resolution of technical issues in software and hardware.</p>
        </div>

        <div className="service-card">
          <img src="/uiux.jpg" alt="UI UX Design" />
          <h3>UI/UX Design</h3>
          <p>Modern, user-friendly interface and experience designs for web and mobile applications.</p>
        </div>

        <div className="service-card">
          <img src="/webdev.jpg" alt="Web Development" />
          <h3>Web Development</h3>
          <p>Responsive and scalable web solutions tailored to business needs.</p>
        </div>

        <div className="service-card">
          <img src="/appdev.jpg" alt="App Development" />
          <h3>App Development</h3>
          <p>Custom mobile applications for Android and iOS platforms.</p>
        </div>

        <div className="service-card">
          <img src="/plc.jpg" alt="PLC Designing" />
          <h3>PLC Designing</h3>
          <p>Automation and control systems with advanced PLC design and programming.</p>
        </div>

        <div className="service-card">
          <img src="/embedded.jpg" alt="Embedded Design" />
          <h3>Embedded Design</h3>
          <p>All types of embedded system design and implementation.</p>
        </div>

        <div className="service-card">
          <img src="/ai.jpg" alt="AI ML" />
          <h3>AI & ML Works</h3>
          <p>Artificial Intelligence and Machine Learning solutions for real-world problems.</p>
        </div>

        <div className="service-card">
          <img src="/training.jpg" alt="Training" />
          <h3>Technical Training</h3>
          <p>Workshops and hands-on technical training programs for colleges.</p>
        </div>

        <div className="service-card">
          <img src="/internship.jpg" alt="Internship" />
          <h3>Internships</h3>
          <p>Practical industry-oriented internship opportunities for students.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;
