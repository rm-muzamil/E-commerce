import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const { data } = await axios.post("http://localhost:5000/api/admin/products", newProduct, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setProducts([...products, data]);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <input type="text" placeholder="Product Name" onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="border p-2 rounded" />
      <input type="number" placeholder="Price" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="border p-2 rounded ml-2" />
      <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">Add</button>

      <ul className="mt-4">
        {products.map((product) => (
          <li key={product._id} className="border p-4 rounded-lg mb-4">
            {product.name} - ${product.price}
            <button onClick={() => deleteProduct(product._id)} className="ml-4 bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
