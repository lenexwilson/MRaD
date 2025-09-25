import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    employeeType: "other",
    message: "",
    isHuman: false,
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.isHuman) return alert("Please verify you are not a robot!");
    if (!formData.acceptTerms) return alert("Please accept the Terms & Conditions!");

    try {
      await axios.post("http://localhost:5000/api/messages/contact", formData);
      alert("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        employeeType: "other",
        message: "",
        isHuman: false,
        acceptTerms: false,
      });
    } catch (err) {
      alert("Error submitting form!");
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We would love to hear from you! Fill out the form below:</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} required />

        <div className="employee-type">
          <label>
            <input type="radio" name="employeeType" value="current" checked={formData.employeeType === "current"} onChange={handleChange} />
            Current Employee
          </label>
          <label>
            <input type="radio" name="employeeType" value="other" checked={formData.employeeType === "other"} onChange={handleChange} />
            Other
          </label>
        </div>

        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows="5" required />

        <label className="checkbox-item">
          <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
          I accept the <Link to="/terms" style={{ color: "#ff00ff" }}>Terms & Conditions</Link>
        </label>

        <div className="recaptcha">
          <ReCAPTCHA sitekey="6LfjxMwrAAAAANTdfixbZHveO3zYNNzPc3gMA4Bx" onChange={value => setFormData({ ...formData, isHuman: !!value })} />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactUs;
