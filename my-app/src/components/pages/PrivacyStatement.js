import React from "react";
import "./PrivacyStatement.css";

function PrivacyStatement() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1>Privacy Statement</h1>
        <p>
          At <strong>MRAD Enterprises</strong>, we value your trust and are
          committed to protecting your privacy. This Privacy Statement explains
          how we collect, use, and safeguard your personal information.
        </p>

        <div className="privacy-section">
          <h2>Information We Collect</h2>
          <p>
            We may collect personal details such as your name, email, phone
            number, and any other information you provide through our forms or
            services.
          </p>
        </div>

        <div className="privacy-section">
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To improve our services and customer support</li>
            <li>To notify you about updates or promotions</li>
            <li>To ensure website security and prevent misuse</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>Cookies & Tracking</h2>
          <p>
            Our site may use cookies to enhance your browsing experience. You can
            disable cookies in your browser settings, but some features may not
            work as intended.
          </p>
        </div>

        <div className="privacy-section">
          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or request deletion of your
            personal data. For any privacy-related inquiries, contact us at{" "}
            <a href="mailto:privacy@mrad.com">privacy@mrad.com</a>.
          </p>
        </div>

        <div className="privacy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Statement, please
            reach out via{" "}
            <a href="mailto:info@mrad.com">info@mrad.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyStatement;
