import React, { createContext, useContext, useState, useEffect } from "react";

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  // const addToCart = (product) => {
  //   setCart((prevCart) => {
    //   let updatedCart = [...prevCart];
  //     const existingProduct = prevCart.find((item) => item._id === product._id);
  //     if (existingProduct) {

  //       console.log("ex")
  //       console.log(existingProduct)
  //       console.log(product)

  //       return prevCart.map((item) =>
  //       item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
  //     );
      
  //   } else {
  //       console.log("this")
  //       return [...prevCart, { ...product, quantity: 1 }];
  //     }
  //   });
  // };
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Create a copy of the cart
      let updatedCart = [...prevCart];
  
      // Find the product in the cart
      const existingProductIndex = updatedCart.findIndex((item) => item._id === product._id);
  
      if (existingProductIndex !== -1) {
        // If product already exists, increase its quantity
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
      } else {
        // If product is new, add it to the cart
        updatedCart.push({ ...product, quantity: 1 });
      }
  
      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  
      return updatedCart;
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Decrease quantity of a product
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove if quantity is 0
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use Cart Context
export const useCart = () => {
  return useContext(CartContext);
};
