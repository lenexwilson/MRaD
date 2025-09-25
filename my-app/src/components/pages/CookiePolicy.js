import React, { useState } from "react";
import "./CookiePolicy.css";

function CookiePolicy() {
  const [cookies, setCookies] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCookies((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    alert("Your cookie preferences have been saved!");
    console.log("Saved preferences:", cookies);
  };

  return (
    <div className="cookie-container">
      <h1>Cookie Policy & Settings</h1>
      <p>
        We use cookies to improve your browsing experience, provide
        personalized content, and analyze our website traffic. Below, you can
        manage your cookie preferences.
      </p>

      <div className="cookie-options">
        <h2>Cookie Preferences</h2>

        <label className="cookie-item">
          <input type="checkbox" name="necessary" checked disabled />
          <span>Necessary Cookies (Required)</span>
          <p>
            These cookies are essential for the website to function properly.
            You cannot opt out of these.
          </p>
        </label>

        <label className="cookie-item">
          <input
            type="checkbox"
            name="analytics"
            checked={cookies.analytics}
            onChange={handleChange}
          />
          <span>Analytics Cookies</span>
          <p>
            These cookies help us understand how visitors interact with our
            website by collecting and reporting information anonymously.
          </p>
        </label>

        <label className="cookie-item">
          <input
            type="checkbox"
            name="marketing"
            checked={cookies.marketing}
            onChange={handleChange}
          />
          <span>Marketing Cookies</span>
          <p>
            These cookies are used to track visitors across websites and deliver
            personalized ads.
          </p>
        </label>
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Preferences
      </button>
    </div>
  );
}

export default CookiePolicy;
