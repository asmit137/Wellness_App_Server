const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: String,
  time: String,
  reason: String,
});

module.exports = mongoose.model("Consultation", consultationSchema);
