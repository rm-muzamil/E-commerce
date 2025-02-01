import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyShop
        </Link>
        <div className="space-x-4">
        <Link to="/products" className="mr-4">Products</Link>
        <Link to="/cart">
        Cart <span className="bg-red-500 px-2 rounded">{cart.length}</span>
      </Link>
        </div>
        <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup" className="bg-blue-600 px-4 py-2 rounded">Sign Up</Link>
            <Link to="/orders" className="mr-4">Orders</Link>
          </>
        )}
        {user && user.role === "admin" && <Link to="/admin" className="mr-4">Admin</Link>}
        {user && <Link to="/profile" className="mr-4">Profile</Link>}
        {user && <Link to="/wishlist" className="mr-4">Wishlist</Link>}


      </div>
      </div>
    </nav>
  );
};

export default Navbar;
