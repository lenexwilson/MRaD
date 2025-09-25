const express = require("express");
const router = express.Router();
const Worksheet = require("../models/Worksheet");
const User = require("../models/User"); // For admin to see employee info

// Create a new worksheet
router.post("/", async (req, res) => {
  try {
    const { userId, hoursWorked, summary } = req.body;
    if (!userId || !hoursWorked || !summary) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const worksheet = new Worksheet({ userId, hoursWorked, summary });
    await worksheet.save();
    res.status(201).json(worksheet);
  } catch (err) {
    console.error("Error saving worksheet:", err);
    res.status(500).json({ error: "Failed to save worksheet" });
  }
});

// Get worksheets for a specific user (Employee page)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const worksheets = await Worksheet.find({ userId }).sort({ createdAt: -1 });
    res.json(worksheets);
  } catch (err) {
    console.error("Error fetching worksheets:", err);
    res.status(500).json({ error: "Failed to fetch worksheets" });
  }
});

// Get all worksheets with user info (Admin page)
router.get("/admin/all", async (req, res) => {
  try {
    const worksheets = await Worksheet.find()
      .populate("userId", "name email role") // Populate user info
      .sort({ createdAt: -1 });
    res.json(worksheets);
  } catch (err) {
    console.error("Error fetching all worksheets:", err);
    res.status(500).json({ error: "Failed to fetch worksheets" });
  }
});

// Update worksheet
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { hoursWorked, summary } = req.body;

    const updatedWorksheet = await Worksheet.findByIdAndUpdate(
      id,
      { hoursWorked, summary },
      { new: true }
    );

    if (!updatedWorksheet) {
      return res.status(404).json({ error: "Worksheet not found" });
    }

    res.json(updatedWorksheet);
  } catch (err) {
    console.error("Error updating worksheet:", err);
    res.status(500).json({ error: "Failed to update worksheet" });
  }
});

module.exports = router;
