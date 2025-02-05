import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Add item to cart


  // const addToCart = (product) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item._id === product._id);
  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
  //       );
  //     } else {
  //       return [...prevCart, { ...product, quantity: 1 }];
  //     }
  //   });
  // };

  // const addToCart = (product) => {
  //   let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  //   // Check if product already exists in cart
  //   const existingProduct = cart.find((item) => item.name === product.name);
    
  //   if (existingProduct) {
  //     existingProduct.quantity += 1; // Increase quantity if already exists
  //   } else {
  //     cart.push({ ...product, quantity: 1 }); // Add new product
  //   }
  
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   alert(`${product.name} added to cart!`);
  // };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.find((item) => item._id === product._id)
        ? prevCart.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
  
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  
      return updatedCart;
    });
  };
  

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  
      return updatedCart;
    });
  };

  // Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
