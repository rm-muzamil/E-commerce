const express = require("express");
const Order = require("../models/Order");

const { authenticate, isAdmin } = require("../middleware/authMiddleware"); // Correct import

const router = express.Router();

// Create Order after successful payment
router.post("/", authenticate, async (req, res) => {
  try {
    const { cart, totalAmount } = req.body;
    const newOrder = new Order({
      userId: req.user.id,
      products: cart,
      totalAmount,
      paymentStatus: "Paid",
      orderStatus: "Processing",
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Get User Orders
router.get("/", authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
