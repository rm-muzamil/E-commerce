import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart } = useCart();
  const [formData, setFormData] = useState({ name: "", address: "", email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between border-b py-2">
                  <span>{item.title}</span>
                  <span className="font-bold">${item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Shipping Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-4"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              className="w-full p-2 border rounded mb-4"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-2 border rounded mb-4"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
