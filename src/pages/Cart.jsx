import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
              <div>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
       

{cart.length > 0 && (
  <div className="text-right mt-6">
    <Link
      to="/checkout"
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
    >
      Proceed to Checkout
    </Link>
  </div>
)}

      </div>
    </div>
  );
};

export default Cart;
