import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/customers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nationalId, phoneNumber }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Save user (localStorage or context if needed)
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/"); // ✅ redirect to homepage
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to SellingCar
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-2">National ID</label>
            <input
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
