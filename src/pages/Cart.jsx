// import React from "react";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const { cart, removeFromCart } = useCart();

//   if (cart.length === 0) {
//     return <p className="text-center text-gray-500">Your cart is empty.</p>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
//       <div className="space-y-4">
//         {cart.map((item) => (
//           <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
//             <div className="flex items-center gap-4">
//               <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
//               <div>
//                 <h2 className="text-lg font-bold">{item.title}</h2>
//                 <p className="text-gray-600">${item.price}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//             >
//               Remove
//             </button>
//           </div>
//         ))}


// {cart.length > 0 && (
//   <div className="text-right mt-6">
//     <Link
//       to="/checkout"
//       className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
//     >
//       Proceed to Checkout
//     </Link>
//   </div>
// )}

//       </div>
//     </div>
//   );
// };

// export default Cart;
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart, decreaseQuantity, clearCart } = useCart();

  const handleCheckout = async () => {
    const { data } = await axios.post("http://localhost:5000/api/payment/create-checkout-session", { cart });
    window.location.href = data.url;
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/products" className="text-blue-500">Shop now</Link></p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg">{item.name}</h3>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                <button onClick={() => decreaseQuantity(item._id)}>Decrease</button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            Checkout
          </button>
          <button onClick={clearCart} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
            Clear Cart
          </button>

          <Link to="/checkout" className="bg-green-500 text-white px-4 py-2 rounded">Proceed to Checkout</Link>

        </>
      )}
    </div>
  );
};

export default Cart;
