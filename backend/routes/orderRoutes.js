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
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Update order status
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updatedOrder);
});

// Delete an order
router.delete("/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted successfully" });
});

module.exports = router;