import { useEffect, useState } from "react";
import axios from "axios";

const Overview = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, sales: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-500 text-white rounded shadow">
          <h3 className="text-lg font-bold">{stats.users}</h3>
          <p>Users</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded shadow">
          <h3 className="text-lg font-bold">{stats.products}</h3>
          <p>Products</p>
        </div>
        <div className="p-4 bg-yellow-500 text-white rounded shadow">
          <h3 className="text-lg font-bold">{stats.orders}</h3>
          <p>Orders</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded shadow">
          <h3 className="text-lg font-bold">${stats.sales}</h3>
          <p>Sales</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
