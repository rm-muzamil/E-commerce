import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const { data } = await axios.get("http://localhost:5000/api/user/wishlist", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setWishlist(data);
    };
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    await axios.delete(`http://localhost:5000/api/user/wishlist/${productId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setWishlist(wishlist.filter((product) => product._id !== productId));
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <div key={product._id} className="border p-4 rounded">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
                <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </Link>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
