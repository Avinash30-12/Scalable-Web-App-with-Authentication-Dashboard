import { useState } from "react";
import API from "../../utils/api";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true); // start loading

  try {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    router.push("/");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false); // stop loading
  }
};


  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account to continue
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
                  <input
  type="email"
  name="email"
  placeholder="Email"
  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-black"
  value={form.email}
  onChange={handleChange}
  required
/>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
                 type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300"
                disabled={loading} // disable while loading
           >
              {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
