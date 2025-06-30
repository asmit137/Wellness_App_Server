const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Goal = require("../models/Goal");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    const goals = await Goal.find({ userId: req.user.userId });
    res.status(200).json({ user, goals });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
