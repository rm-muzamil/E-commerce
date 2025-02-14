// const express = require("express");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const router = express.Router();

// router.post("/create-checkout-session", async (req, res) => {
//   const { cart } = req.body;

//   const lineItems = cart.map((item) => ({
//     price_data: {
//       currency: "usd",
//       product_data: { name: item.name },
//       unit_amount: item.price * 100,
//     },
//     quantity: item.quantity,
//   }));

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cart",
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     res.status(500).json({ error: "Payment failed" });
//   }
// });

// module.exports = router;


const Order = require("../models/Order");
const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


const { authenticate } = require("../middleware/authMiddleware");


router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: { name: product.name },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/payment-success",
    cancel_url: "http://localhost:3000/payment-cancel",
  });

  res.json({ id: session.id });
});




module.exports = router;