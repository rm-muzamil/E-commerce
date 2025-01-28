import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";


const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

  useEffect(() => {
    // Fetch product details by ID
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data); // Set product data in state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]); // Dependency on `id` so it fetches whenever the ID changes

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="font-bold text-xl text-gray-800 mb-4">${product.price}</p>
          <button
  onClick={() => addToCart(product)}
  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
>
  Add to Cart
</button>;
          <div className="mt-4">
            <Link to="/" className="text-blue-600 hover:underline">
              &larr; Back to Products
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetails;
