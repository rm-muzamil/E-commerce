import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/orders").then((res) => setOrders(res.data));
    axios.get("http://localhost:5000/api/admin/users").then((res) => setUsers(res.data));
    axios.get("http://localhost:5000/api/admin/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-500 text-white rounded-lg">
          <h3 className="text-lg font-bold">Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="p-4 bg-green-500 text-white rounded-lg">
          <h3 className="text-lg font-bold">Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div className="p-4 bg-purple-500 text-white rounded-lg">
          <h3 className="text-lg font-bold">Total Products</h3>
          <p>{products.length}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold">Sales Analytics</h3>
        <Bar
          data={{
            labels: ["January", "February", "March", "April", "May"],
            datasets: [
              {
                label: "Sales",
                data: [5000, 7000, 4000, 8000, 9000],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
