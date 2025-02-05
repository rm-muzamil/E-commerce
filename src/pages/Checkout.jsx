import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
const stripePromise = loadStripe("pk_test_51QnNKqR7856O1MMucOO5LQYVzW69j960sQ08BFQJYBKSrqLvMoEa0RNdnIw7g49GvaSaUY0gzXSDRqpQayDbbD700017eiHUWg");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: elements.getElement(CardElement),
  //   });

  //   if (!error) {
  //     const { id } = paymentMethod;
  //     const { data } = await axios.post("http://localhost:5000/api/payments/create-checkout-session", {
  //       products: JSON.parse(localStorage.getItem("cart")),
  //     });

  //     window.location.href = data.id;
  //   } else {
  //     alert(error.message);
  //   }
  //   setLoading(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post("http://localhost:5000/api/payments/create-checkout-session", {
        products: JSON.parse(localStorage.getItem("cart")),
      });
  
      // Load Stripe and redirect to checkout
      const stripe = await loadStripe("pk_test_51QnNKqR7856O1MMucOO5LQYVzW69j960sQ08BFQJYBKSrqLvMoEa0RNdnIw7g49GvaSaUY0gzXSDRqpQayDbbD700017eiHUWg");
      await stripe.redirectToCheckout({ sessionId: data.id });
  
    } catch (error) {
      console.error("Payment error:", error.response ? error.response.data : error.message);
      alert("Payment request failed! Check console for details.");
    }
  };

  // const Checkout = () => {
  //   const { cart } = useCart();
  //   const [loading, setLoading] = useState(false);
  //   const [formData, setFormData] = useState({ name: "", address: "", email: "" });
  //   const navigate = useNavigate();

  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  //   const handlePayment = async () => {
  //     setLoading(true);
  //     const { data } = await axios.post("http://localhost:5000/api/payment/create-checkout-session", { cart });
  //     window.location.href = data.url;
  //   };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Order placed successfully!");
  //   navigate("/");
  // };

  return (
    // <div className="container mx-auto px-4 py-8">
    //   <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //     {/* Order Summary */}
    //     <div className="bg-white p-6 rounded-lg shadow-lg">
    //       <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
    //       {cart.length === 0 ? (
    //         <p className="text-gray-600">Your cart is empty.</p>
    //       ) : (
    //         <ul>
    //           {cart.map((item) => (
    //             <li key={item.id} className="flex justify-between border-b py-2">
    //               <span>{item.title}</span>
    //               <span className="font-bold">${item.price}</span>
    //             </li>
    //           ))}
    //         </ul>
    //       )}
    //     </div>

    //     {/* Shipping Form */}
    //     <div className="bg-white p-6 rounded-lg shadow-lg">
    //       <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
    //       <form onSubmit={handleSubmit}>
    //         <input
    //           type="text"
    //           name="name"
    //           placeholder="Full Name"
    //           className="w-full p-2 border rounded mb-4"
    //           value={formData.name}
    //           onChange={handleChange}
    //           required
    //         />
    //         <input
    //           type="text"
    //           name="address"
    //           placeholder="Shipping Address"
    //           className="w-full p-2 border rounded mb-4"
    //           value={formData.address}
    //           onChange={handleChange}
    //           required
    //         />
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="Email Address"
    //           className="w-full p-2 border rounded mb-4"
    //           value={formData.email}
    //           onChange={handleChange}
    //           required
    //         />
    //         <button
    //           type="submit"
    //           className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
    //         >
    //           Place Order
    //         </button>
    //       </form>
    //       <button onClick={handlePayment} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
    //         {loading ? "Processing..." : "Proceed to Payment"}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl mb-4">Enter Payment Details</h2>
      <CardElement className="border p-2 mb-4" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
