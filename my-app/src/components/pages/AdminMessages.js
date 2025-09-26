// src/components/pages/AdminMessages.js
import React, { useEffect, useState } from "react";
import api from "../../api"; // ✅ corrected path
import "./AdminMessages.css";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [worksheets, setWorksheets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ hoursWorked: "", summary: "" });

  useEffect(() => {
    fetchMessages();
    fetchWorksheets();
    const interval = setInterval(() => {
      fetchMessages();
      fetchWorksheets();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/messages");
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching messages:", err);
    }
  };

  const fetchWorksheets = async () => {
    try {
      const res = await api.get("/worksheets/admin/all");
      setWorksheets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching worksheets:", err);
    }
  };

  const startEdit = (worksheet) => {
    setEditingId(worksheet._id);
    setEditData({ hoursWorked: worksheet.hoursWorked, summary: worksheet.summary });
  };

  const saveEdit = async (id) => {
    try {
      await api.put(`/worksheets/${id}`, editData);
      setEditingId(null);
      fetchWorksheets();
    } catch (err) {
      console.error("❌ Error updating worksheet:", err);
      alert("Error updating worksheet!");
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>📩 Admin Dashboard</h1>
        <p>Manage contact messages and employee worksheets</p>
      </header>

      <section className="messages-section">
        <h2>Contact Messages</h2>
        {messages.length === 0 ? (
          <p className="empty-msg">No messages yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="messages-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Employee Type</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id}>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.phone}</td>
                    <td>
                      <span
                        className={`badge ${
                          msg.employeeType === "current" ? "badge-green" : "badge-blue"
                        }`}
                      >
                        {msg.employeeType}
                      </span>
                    </td>
                    <td>{msg.message}</td>
                    <td>{new Date(msg.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="worksheets-section">
        <h2>Employee Worksheets</h2>
        {worksheets.length === 0 ? (
          <p className="empty-msg">No worksheets yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="messages-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Hours Worked</th>
                  <th>Summary</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {worksheets.map((w) => (
                  <tr key={w._id}>
                    <td>{w.userId?.email || "Unknown"}</td>
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
                    <td>{new Date(w.createdAt).toLocaleString()}</td>
                    <td>
                      {editingId === w._id ? (
                        <button onClick={() => saveEdit(w._id)}>Save</button>
                      ) : (
                        <button onClick={() => startEdit(w)}>Edit</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminMessages;
