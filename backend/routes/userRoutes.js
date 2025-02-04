const express = require("express");
const User = require("../models/Usere");
const bcrypt = require("bcryptjs");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  const { role } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  res.json(updatedUser);
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update user role
router.put("/:id", async (req, res) => {
  const { role } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  res.json(updatedUser);
});

// Delete a user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
});

// Get wishlist
router.get("/wishlist", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).populate("wishlist");
  res.json(user.wishlist);
});

// Add to wishlist
router.post("/wishlist", authenticate, async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user.id);

  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }

  res.json(user.wishlist);
});

// Remove from wishlist
router.delete("/wishlist/:productId", authenticate, async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user.id);

  user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  await user.save();

  res.json(user.wishlist);
});

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
