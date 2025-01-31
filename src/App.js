import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";







function App() {
  const { user} = useAuth();
  return (

    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />;
          <Route path="/orders" element={<Orders />} />;
          <Route path="/admin" element={user && user.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />;
          <Route path="/profile" element={<Profile />} />;
        </Routes>
        {/* Add Footer here */}
      </div>
    </Router>


  );
}

export default App;
