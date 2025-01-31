// import { useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";

// const Success = () => {
//   const { clearCart } = useCart();

//   useEffect(() => {
//     clearCart();
//   }, []);

//   return (
//     <div className="container mx-auto p-8 text-center">
//       <h2 className="text-2xl font-bold text-green-500">Payment Successful!</h2>
//       <p>Thank you for your order. Your payment has been processed.</p>
//       <Link to="/" className="text-blue-500 mt-4">Go Home</Link>
//     </div>
//   );
// };

// export default Success;


import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Success = () => {
  const [searchParams] = useSearchParams();
  const { clearCart, cart } = useCart();
  const { user } = useAuth();
  
  const userId = searchParams.get("userId");
  const total = searchParams.get("total");

  useEffect(() => {
    if (userId && cart.length > 0) {
      axios.post("http://localhost:5000/api/orders", { cart, totalAmount: total }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      clearCart();
    }
  }, [userId, cart]);

  return (
    <div className="container mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold text-green-500">Payment Successful!</h2>
      <p>Your order has been placed successfully.</p>
    </div>
  );
};

export default Success;
