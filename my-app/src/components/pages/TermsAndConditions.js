import React, { useState } from "react";
import "./TermsAndConditions.css";

function TermsAndConditions() {
  const [agreements, setAgreements] = useState({
    privacy: false,
    cookies: false,
    updates: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreements.privacy || !agreements.cookies) {
      alert("Please accept all required terms before proceeding.");
      return;
    }
    alert("Thank you! You accepted the Terms & Conditions.");
  };

  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>
      <p>Please read and accept the following terms before continuing:</p>

      <form onSubmit={handleSubmit} className="terms-form">
        {/* Privacy Policy */}
        <label className="checkbox-item">
          <input
            type="checkbox"
            name="privacy"
            checked={agreements.privacy}
            onChange={handleChange}
          />
          I agree to the <strong>Privacy Policy</strong>.
        </label>
        <p className="statement">
          We respect your privacy and ensure that any personal information you
          provide will be securely stored and used only for communication and
          service purposes.
        </p>

        {/* Cookies */}
        <label className="checkbox-item">
          <input
            type="checkbox"
            name="cookies"
            checked={agreements.cookies}
            onChange={handleChange}
          />
          I accept the use of <strong>Cookies</strong>.
        </label>
        <p className="statement">
          Our website uses cookies to enhance your browsing experience, remember
          your preferences, and provide relevant content.
        </p>

        {/* Updates */}
        <label className="checkbox-item">
          <input
            type="checkbox"
            name="updates"
            checked={agreements.updates}
            onChange={handleChange}
          />
          I agree to receive updates & notifications (optional).
        </label>
        <p className="statement">
          By opting in, you may receive emails about new features, offers, or
          important changes. You can unsubscribe at any time.
        </p>

        <button type="submit">Accept & Continue</button>
      </form>
    </div>
  );
}

export default TermsAndConditions;
