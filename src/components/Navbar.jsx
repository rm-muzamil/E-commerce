import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyShop
        </Link>
        <div className="space-x-4">
          <Link to="/products" className="text-gray-700 hover:text-blue-600">
            Products
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600">
            Cart
          </Link>
        </div>
        <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup" className="bg-blue-600 px-4 py-2 rounded">Sign Up</Link>
          </>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
