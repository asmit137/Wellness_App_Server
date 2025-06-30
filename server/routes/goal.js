const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");
const auth = require("../middleware/authMiddleware");

// Create Goal
router.post("/", auth, async (req, res) => {
  try {
    const { goalType, value, target } = req.body;
    const goal = new Goal({
      userId: req.userId, // ✅ make sure req.user.userId exists
      goalType,
      value,
      target
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    console.error("Create goal error:", err);
    res.status(500).json({ message: "Error creating goal", error: err.message });
  }
});

// Get Goals
router.get("/", auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId });
    res.json(goals);
  } catch (err) {
    console.error("Get goals error:", err);
    res.status(500).json({ message: "Failed to get goals", error: err.message });
  }
});

// Update Goal
router.put("/:id", auth, async (req, res) => {
  try {
    const { goalType, value, target } = req.body;
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { goalType, value, target },
      { new: true }
    );
    res.json(updatedGoal);
  } catch (err) {
    console.error("Update goal error:", err);
    res.status(500).json({ message: "Failed to update goal", error: err.message });
  }
});

// Delete Goal
router.delete("/:id", auth, async (req, res) => {
  try {
    await Goal.deleteOne({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Goal deleted" });
  } catch (err) {
    console.error("Delete goal error:", err);
    res.status(500).json({ message: "Failed to delete goal", error: err.message });
  }
});

module.exports = router;
