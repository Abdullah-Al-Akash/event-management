import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import { login as loginApi } from "../api/auth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginApi({ email, password });
      const data = response.data;

      // Save user and token via context login function
      login(data.user, data.token);

      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - image or branding */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex w-1/2 bg-brandGreen items-center justify-center"
      >
        <div className="text-white p-12 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg">
            Manage your events easily with our powerful event management system.
          </p>
        </div>
      </motion.div>

      {/* Right side - login form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col justify-center p-12 w-full md:w-1/2 bg-white shadow-lg"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-brandGreen text-center">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-brandGreen transition"
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-brandGreen transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-brandGreen hover:bg-[#276749] text-white font-semibold rounded-md shadow-md transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-brandGreen font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
