import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <p>Status: {order.orderStatus}</p>
              <p>Total Amount: ${order.totalAmount}</p>
              <ul className="mt-2">
                {order.products.map((product, index) => (
                  <li key={index}>
                    {product.name} - ${product.price} x {product.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
