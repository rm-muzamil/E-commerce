import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    await axios.put(`http://localhost:5000/api/admin/orders/${orderId}`, { status }, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setOrders(orders.map((order) => (order._id === orderId ? { ...order, orderStatus: status } : order)));
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <p>User: {order.userId.name} ({order.userId.email})</p>
              <p>Status: {order.orderStatus}</p>
              <select
                value={order.orderStatus}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                className="border p-2 rounded"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
