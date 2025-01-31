import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState({});
  const [newPassword, setNewPassword] = useState({ oldPassword: "", newPassword: "" });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfile(data);
      setAddresses(data.addresses || []);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    const { data } = await axios.put("http://localhost:5000/api/user/profile", profile, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setProfile(data);
    setUser({ ...user, name: data.name, email: data.email });
  };

  const changePassword = async () => {
    await axios.put("http://localhost:5000/api/user/change-password", newPassword, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    alert("Password changed successfully");
  };

  const updateAddresses = async () => {
    await axios.put("http://localhost:5000/api/user/addresses", { addresses }, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {loading ? <p>Loading...</p> : (
        <>
          <div className="mb-4">
            <label>Name:</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="border p-2 rounded w-full" />
          </div>
          <div className="mb-4">
            <label>Email:</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="border p-2 rounded w-full" />
          </div>
          <button onClick={updateProfile} className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>

          <h3 className="text-xl font-bold mt-6">Change Password</h3>
          <input type="password" placeholder="Old Password" onChange={(e) => setNewPassword({ ...newPassword, oldPassword: e.target.value })} className="border p-2 rounded w-full" />
          <input type="password" placeholder="New Password" onChange={(e) => setNewPassword({ ...newPassword, newPassword: e.target.value })} className="border p-2 rounded w-full mt-2" />
          <button onClick={changePassword} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Change Password</button>

          <h3 className="text-xl font-bold mt-6">Addresses</h3>
          {addresses.map((address, index) => (
            <div key={index} className="border p-4 rounded mb-2">
              <input type="text" placeholder="Street" value={address.street} onChange={(e) => {
                const newAddresses = [...addresses];
                newAddresses[index].street = e.target.value;
                setAddresses(newAddresses);
              }} className="border p-2 rounded w-full" />
              <input type="text" placeholder="City" value={address.city} onChange={(e) => {
                const newAddresses = [...addresses];
                newAddresses[index].city = e.target.value;
                setAddresses(newAddresses);
              }} className="border p-2 rounded w-full mt-2" />
              <button onClick={() => {
                const newAddresses = addresses.filter((_, i) => i !== index);
                setAddresses(newAddresses);
              }} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Remove</button>
            </div>
          ))}
          <button onClick={() => setAddresses([...addresses, { street: "", city: "", state: "", zip: "", country: "" }])} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Add Address</button>
          <button onClick={updateAddresses} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 ml-2">Save Addresses</button>
        </>
      )}
    </div>
  );
};

export default Profile;
