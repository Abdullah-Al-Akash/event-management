import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { register as registerApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);

  const imgbbApiKey = "75858a0a1b113c748be878924f938f71";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      formData
    );
    return res.data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, photo } = form;

    if (!name || !email || !password || !photo) {
      Swal.fire("All fields are required!", "", "warning");
      setLoading(false);
      return;
    }

    try {
      const photoURL = await uploadImageToImgbb(photo);

      const res = await registerApi({
        name,
        email,
        password,
        photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Registration successful!",
        timer: 1500,
        showConfirmButton: false,
      });

      // optional: auto-login
      login(res.data.user);
      localStorage.setItem("token", res.data.token);

      navigate("/home");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - branding */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex w-1/2 bg-brandGreen items-center justify-center"
      >
        <div className="text-white p-12 text-center">
          <h1 className="text-5xl font-bold mb-4">Create an Account</h1>
          <p className="text-lg">
            Join Natural Event and manage your events like a pro.
          </p>
        </div>
      </motion.div>

      {/* Right side - registration form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col justify-center p-12 w-full md:w-1/2 bg-white shadow-lg"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-brandGreen text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-brandGreen transition"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-brandGreen transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-brandGreen transition"
              placeholder="Your password"
            />
          </div>

          <div>
            <label
              htmlFor="photo"
              className="block mb-2 font-semibold text-gray-700"
            >
              Profile Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="file-input file-input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-brandGreen hover:bg-[#276749] text-white font-semibold rounded-md shadow-md transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-brandGreen font-semibold hover:underline"
          >
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
}
