const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  goalType: String,
  value: Number,
  target: Number,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Goal", GoalSchema);
