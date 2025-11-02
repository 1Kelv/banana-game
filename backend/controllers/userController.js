// OpenAI (no date) HTML + CSS + javascript, ChatGPT. 
//Available at: https://chatgpt.com/g/g-JOJBoNrCa-html-css-javascript (Accessed: 01 December 2024). 
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ success: true, message: "Registration successful.", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password." });
    }

    res.status(200).json({ success: true, message: "Login successful.", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
