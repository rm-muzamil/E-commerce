import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-xl font-bold mb-5">Admin Dashboard</h2>
      <ul>
        <li className="mb-3"><Link to="/admin">Overview</Link></li>
        <li className="mb-3"><Link to="/admin/products">Manage Products</Link></li>
        <li className="mb-3"><Link to="/admin/orders">Manage Orders</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
