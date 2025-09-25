import React, { useState } from "react";
import "./JobOpenings.css";

const jobData = [
  "Software Engineer",
  "UI/UX Designer",
  "Web Developer",
  "App Developer",
  "AI/ML Specialist",
  "Embedded Systems Engineer",
  "PLC Programmer",
];

function JobOpenings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = jobData.filter((job) =>
        job.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (job) => {
    setSearchTerm(job);
    setSuggestions([]);
  };

  return (
    <div className="job-container">
      <h1>Job Openings</h1>
      <p>Explore our current job openings and career opportunities at MRAD Enterprises.</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleChange}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((job, index) => (
              <li key={index} onClick={() => handleSuggestionClick(job)}>
                {job}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="job-list">
        {jobData
          .filter((job) => job.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job}</h3>
              <p>Exciting opportunity at MRAD Enterprises for {job}.</p>
              <button>Apply Now</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default JobOpenings;
