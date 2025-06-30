// src/pages/AddEvent.jsx
import React, { useState } from "react";
import secureClient from "../api/secureClient";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function AddEvent() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    dateTime: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Login Required", "You must be logged in to add an event.", "warning");
      return;
    }

    const payload = {
      ...formData,
      name: user.name, // who posted
    };

    try {
      setLoading(true);
      await secureClient.post("/events", payload);
      setLoading(false);
      Swal.fire("Success", "Event added successfully!", "success");
      setFormData({ title: "", dateTime: "", location: "", description: "" });
    } catch (error) {
      setLoading(false);
      Swal.fire("Error", error.response?.data?.message || "Something went wrong.", "error");
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-md rounded-xl border border-gray-100"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-brandGreen mb-6 text-center">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-sm text-gray-600">Event Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-sm text-gray-600">Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-sm text-gray-600">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-sm text-gray-600">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
          ></textarea>
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className={`w-full py-2 font-medium rounded-md text-white transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-brandGreen hover:bg-emerald-700"
          }`}
        >
          {loading ? "Adding Event..." : "Add Event"}
        </motion.button>
      </form>
    </motion.div>
  );
}
