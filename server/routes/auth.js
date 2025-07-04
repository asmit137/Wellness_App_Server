const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.get("/test", (req, res)=>{
res.send(`Your are in Auth API`)
})


const createToken = (user) => {
return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
expiresIn: "7d",
});
};


router.post("/register", async (req, res) => {
try {
const { name, email, password, captchaToken } = req.body;


if (!captchaToken)
return res.status(400).json({ message: "Captcha required" });

const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`;
const { data } = await axios.post(verifyURL);

if (!data.success)
return res.status(400).json({ message: "Captcha validation failed" });

const existing = await User.findOne({ email });
if (existing)
return res.status(400).json({ message: "Email already exists" });

const user = new User({ name, email, password });
await user.save();

const token = createToken(user);
res.status(201).json({ token });
} catch (err) {
console.error("Registration Error:", err);
res.status(500).json({ message: "Server error" });
}
});


router.post("/login", async (req, res) => {
try {
const { email, password, captchaToken } = req.body;

if (!captchaToken)
return res.status(400).json({ message: "Captcha required" });

const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`;
const { data } = await axios.post(verifyURL);

if (!data.success)
return res.status(400).json({ message: "Captcha validation failed" });

const user = await User.findOne({ email });
if (!user)
return res.status(400).json({ message: "Invalid credentials" });

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch)
return res.status(400).json({ message: "Invalid credentials" });

const token = createToken(user);
res.status(200).json({ token });
} catch (err) {
console.error("Login Error:", err);
res.status(500).json({ message: "Server error" });
}
});


router.post("/googlelogin", async (req, res) => {
const { token } = req.body;

try {
const ticket = await client.verifyIdToken({
idToken: token,
audience: process.env.GOOGLE_CLIENT_ID
});

const payload = ticket.getPayload();
const { email, name } = payload;


let user = await User.findOne({ email });

if (!user) {

user = await User.create({
name,
email,
googleAuth: true
});
}

const authToken = createToken(user);

res.json({ token: authToken });
} catch (err) {
console.error("Google OAuth error:", err);
res.status(401).json({ message: "Google sign-in failed" });
}
});

module.exports = router;
