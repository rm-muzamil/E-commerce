import { useEffect } from "react";
import { useCart } from "../context/CartContext";

const OrderSuccess = () => {
  const { setCart } = useCart();

  useEffect(() => {
    setCart([]);
  }, []);

  return (
    <div className="container mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Order Successful!</h2>
      <p>Thank you for your purchase. You will receive an email confirmation soon.</p>
    </div>
  );
};

export default OrderSuccess;
