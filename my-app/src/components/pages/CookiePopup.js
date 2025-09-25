import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CookiePopup.css"; // Add this CSS file

function CookiePopup() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // Show popup only if cookies not accepted/declined
  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
    navigate("/"); // redirect to homepage
  };

  const declineCookies = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setVisible(false);
    navigate("/cookies"); // redirect to cookie policy page
  };

  if (!visible) return null;

  return (
    <div className="cookie-overlay">
      <div className="cookie-popup">
        <p>
          🍪 We use cookies to improve your experience. By continuing, you agree
          to our cookie policy.
        </p>
        <div className="cookie-buttons">
          <button className="accept" onClick={acceptCookies}>
            Accept
          </button>
          <button className="decline" onClick={declineCookies}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookiePopup;
