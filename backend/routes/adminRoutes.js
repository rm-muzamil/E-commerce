const express = require("express"); // ✅ Import Express
const router = express.Router(); // ✅ Define Router
const { authenticate, isAdmin } = require("../middleware/authMiddleware"); // Import authentication middleware


const Product = require("../models/Product");

// Add Product
router.post("/products", authenticate, isAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});



// Edit Product
router.put("/products/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete Product
router.delete("/products/:id", authenticate, isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router; // ✅ Export router
