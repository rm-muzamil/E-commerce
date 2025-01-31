const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Get user profile
router.get("/profile", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// Update user details
router.put("/profile", authenticate, async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
  res.json(user);
});

// Change password
router.put("/change-password", authenticate, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return res.status(400).json({ error: "Incorrect old password" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password changed successfully" });
});

// Manage addresses
router.put("/addresses", authenticate, async (req, res) => {
  const { addresses } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { addresses }, { new: true });
  res.json(user.addresses);
});

module.exports = router;
