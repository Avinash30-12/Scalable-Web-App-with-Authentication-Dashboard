import { useState , useEffect } from "react";
import API from "../utils/api";

export default function ProfileCard({ user, darkMode = false, refreshProfile ,  setUser}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });

 const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSave = async () => {
  try {
    const res = await API.put("/profile", form);
    if (!res.data) throw new Error("No data returned");

    // Update parent Dashboard state
    if (refreshProfile) refreshProfile(res.data);

    // Update internal form state instantly
    setForm({ name: res.data.name, email: res.data.email });

    setEditing(false);
    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Update error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Update failed");
  }
};

 useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email });
    }
  }, [user]);


  return (
  <div
    className="p-6 mb-6 flex flex-col md:flex-row justify-between items-center rounded-2xl shadow-2xl transition 
               bg-white/80 backdrop-blur-md border border-white/30 text-gray-800"
  >
    {editing ? (
      <div className="flex flex-col gap-3 w-full md:w-2/3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    ) : (
      <div>
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-700">{user.email}</p>
      </div>
    )}

    <div className="mt-4 md:mt-0 flex gap-2">
      {editing ? (
        <>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow transition"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-full shadow transition"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow transition"
        >
          Edit
        </button>
      )}
    </div>
  </div>
);
}