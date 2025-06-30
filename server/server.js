const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const goalRoutes = require("./routes/goal");
const auth = require("./routes/auth")
const profile = require("./routes/profile")
const consultationRoutes = require("./routes/consultation");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB Error:", err));

app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/consultation", consultationRoutes);
app.use("/api/goals", goalRoutes);


app.get("/", (req, res)=>{
  res.send(`Your are on port ${process.env.PORT}`)
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
