// routes/consultation.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Consultation = require("../models/Consultation");

// GET: Fetch all consultations for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    
    const consultations = await Consultation.find({ user: req.userId });
    res.json(consultations);
  } catch (err) {
    console.error("Consultation fetch error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST: Create a new consultation
router.post("/", auth, async (req, res) => {
  try {
    const { date, time, reason } = req.body;

    if (!date || !time || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const consultation = new Consultation({
      user: req.userId, 
      date,
      time,
      reason,
    });

    await consultation.save();
    res.status(201).json(consultation);
  } catch (err) {
    console.error("Consultation creation error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
