import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then((res) => setUsers(res.data));
  }, []);

  const handleRoleChange = async (id, role) => {
    await axios.put(`http://localhost:5000/api/users/${id}`, { role });
    setUsers(users.map((user) => (user._id === id ? { ...user, role } : user)));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">User ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">{user._id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border p-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
