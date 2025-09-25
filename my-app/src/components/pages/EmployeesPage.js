import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeesPage.css";

const BACKEND_URL = "http://localhost:5000";

function EmployeesPage() {
  const [hoursWorked, setHoursWorked] = useState("");
  const [summary, setSummary] = useState("");
  const [worksheets, setWorksheets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ hoursWorked: "", summary: "" });

  const userId = localStorage.getItem("userId"); // current logged-in employee
  const token = localStorage.getItem("token");

  // Fetch worksheets
  useEffect(() => {
    const fetchWorksheets = async () => {
      if (!userId || !token) return;
      try {
        const res = await axios.get(`${BACKEND_URL}/api/worksheets/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorksheets(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching worksheets:", err.response?.data || err);
        alert(err.response?.data?.error || "Failed to fetch worksheets");
      }
    };
    fetchWorksheets();
  }, [userId, token]);

  // Save new worksheet
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hoursWorked || !summary.trim()) return alert("All fields are required.");

    try {
      await axios.post(
        `${BACKEND_URL}/api/worksheets`,
        { userId, hoursWorked, summary },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHoursWorked("");
      setSummary("");

      // Refresh worksheets
      const res = await axios.get(`${BACKEND_URL}/api/worksheets/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorksheets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error saving worksheet:", err.response?.data || err);
      alert(err.response?.data?.error || "Error saving worksheet!");
    }
  };

  // Start editing a worksheet
  const startEdit = (worksheet) => {
    setEditingId(worksheet._id);
    setEditData({ hoursWorked: worksheet.hoursWorked, summary: worksheet.summary });
  };

  // Save edited worksheet
  const saveEdit = async (id) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/worksheets/${id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      // Refresh worksheets
      const res = await axios.get(`${BACKEND_URL}/api/worksheets/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorksheets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error updating worksheet:", err.response?.data || err);
      alert(err.response?.data?.error || "Error updating worksheet!");
    }
  };

  return (
    <div className="employee-page">
      <h1>👔 Employee Dashboard</h1>

      <form className="worksheet-form" onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.1"
          placeholder="Hours Worked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Work Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <button type="submit">Save Worksheet</button>
      </form>

      <h2>Your Worksheets</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Summary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {worksheets.length === 0 ? (
            <tr>
              <td colSpan="4">No worksheets yet.</td>
            </tr>
          ) : (
            worksheets.map((w) => (
              <tr key={w._id}>
                <td>{new Date(w.createdAt).toLocaleString()}</td>
                <td>
                  {editingId === w._id ? (
                    <input
                      type="number"
                      value={editData.hoursWorked}
                      onChange={(e) =>
                        setEditData({ ...editData, hoursWorked: e.target.value })
                      }
                    />
                  ) : (
                    w.hoursWorked
                  )}
                </td>
                <td>
                  {editingId === w._id ? (
                    <input
                      type="text"
                      value={editData.summary}
                      onChange={(e) =>
                        setEditData({ ...editData, summary: e.target.value })
                      }
                    />
                  ) : (
                    w.summary
                  )}
                </td>
                <td>
                  {editingId === w._id ? (
                    <button onClick={() => saveEdit(w._id)}>Save</button>
                  ) : (
                    <button onClick={() => startEdit(w)}>Edit</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesPage;
