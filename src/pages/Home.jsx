import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState(""); 

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    axios.get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Filter products based on category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  // Sort products by price
  const handleSortChange = (order) => {
    setSortOrder(order);
    let sortedProducts = [...filteredProducts];

    if (order === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Featured Products</h1>

      {/* Filters & Sorting */}
      <div className="flex justify-between mb-6">
        {/* Category Filter */}
        <select
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Sorting Options */}
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
