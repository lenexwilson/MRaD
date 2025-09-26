require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const worksheetRoutes = require("./routes/worksheet");
const messageRoutes = require("./routes/messages");

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:3000",                                // local frontend
      "https://m-ra-47rlja82b-lenexwilsons-projects.vercel.app", // your Vercel frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Root route (for Render health check)
app.get("/", (req, res) => {
  res.send("✅ Backend is running 🚀");
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/worksheets", worksheetRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/worksheets", require("./routes/worksheet")); // 🔹 kept as you had

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
