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
const express = require("express"); // ✅ Import Express
const router = express.Router();


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Make sure the secret key is set

router.post("/create-checkout-session", async (req, res) => {
  const { cart, userId } = req.body;
  
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `http://localhost:3000/success?userId=${userId}&total=${totalAmount}`,
    cancel_url: "http://localhost:3000/cart",
  });

  res.json({ url: session.url });
});

module.exports = router;