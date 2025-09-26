// server.js (Backend)
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const worksheetRoutes = require("./routes/worksheet");
const messageRoutes = require("./routes/messages");

const app = express();

// CORS configuration for frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local frontend
      "https://m-ra-47rlja82b-lenexwilsons-projects.vercel.app" // deployed frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

// Root route for health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running 🚀");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/worksheets", worksheetRoutes);
app.use("/api/messages", messageRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
