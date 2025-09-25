import React, { useState } from "react";
import "./Internships.css";

const internshipData = [
  "Software Developer Intern",
  "Web Developer Intern",
  "Data Analyst Intern",
  "Marketing Intern",
  "Graphic Designer Intern",
  "HR Intern",
  "Business Analyst Intern",
];

function Internships() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = internshipData.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="intern-container">
      <h1>Internships</h1>
      <p>We offer practical industry-oriented internship opportunities for students.</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search internships..."
          value={searchTerm}
          onChange={handleChange}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="intern-list">
        {internshipData
          .filter((intern) =>
            intern.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((intern, index) => (
            <div className="intern-card" key={index}>
              <h3>{intern}</h3>
              <p>Apply now and gain valuable experience in the field of {intern.split(" ")[0]}.</p>
              <button>Apply</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Internships;
