import React, { useState, useEffect } from "react";
import secureClient from "../api/secureClient";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function MyEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // For update modal
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const res = await secureClient.get("/events/my");
      setEvents(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire("Error", "Failed to load your events.", "error");
    }
  };

  useEffect(() => {
    if (user) fetchMyEvents();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the event.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await secureClient.delete(`/events/${id}`);
        Swal.fire("Deleted!", "Your event has been deleted.", "success");
        // Refresh events list
        fetchMyEvents();
      } catch (error) {
        Swal.fire("Error", "Failed to delete event.", "error");
      }
    }
  };

  const openUpdateModal = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const closeUpdateModal = () => {
    setShowModal(false);
    setCurrentEvent(null);
  };

  const handleUpdateChange = (e) => {
    setCurrentEvent({
      ...currentEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const payload = {
        title: currentEvent.title,
        dateTime: currentEvent.dateTime,
        location: currentEvent.location,
        description: currentEvent.description,
      };
      await secureClient.put(`/events/${currentEvent._id}`, payload);
      Swal.fire("Updated!", "Event updated successfully.", "success");
      setUpdateLoading(false);
      closeUpdateModal();
      fetchMyEvents();
    } catch (error) {
      setUpdateLoading(false);
      Swal.fire("Error", "Failed to update event.", "error");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-12 text-brandGreen font-semibold">Loading your events...</p>
    );
  }

  if (events.length === 0) {
    return (
      <p className="text-center mt-12 text-gray-600 font-semibold">
        You have not added any events yet.
      </p>
    );
  }

  return (
    <>
      <motion.div
        className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {events.map((event) => (
          <motion.div
            key={event._id}
            className="bg-white shadow-md border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-xl font-bold text-brandGreen">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-1">By: {event.name}</p>
            <p className="text-sm text-gray-500">📍 {event.location}</p>
            <p className="text-sm text-gray-500">🗓️ {new Date(event.dateTime).toLocaleString()}</p>
            <p className="text-sm text-gray-700 mt-2">{event.description}</p>
            <p className="text-sm font-semibold text-gray-600 mt-2">
              Attendees: {event.attendeeCount}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => openUpdateModal(event)}
                className="px-4 py-2 bg-brandGreen text-white rounded-md hover:bg-emerald-700 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-brandGreen mb-4 text-center">Update Event</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-sm text-gray-600">Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentEvent.title}
                  onChange={handleUpdateChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm text-gray-600">Date & Time</label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={new Date(currentEvent.dateTime).toISOString().slice(0,16)} // format for datetime-local
                  onChange={handleUpdateChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm text-gray-600">Location</label>
                <input
                  type="text"
                  name="location"
                  value={currentEvent.location}
                  onChange={handleUpdateChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm text-gray-600">Description</label>
                <textarea
                  name="description"
                  value={currentEvent.description}
                  onChange={handleUpdateChange}
                  rows="4"
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={updateLoading}
                className={`w-full py-2 font-medium rounded-md text-white transition ${
                  updateLoading ? "bg-gray-400 cursor-not-allowed" : "bg-brandGreen hover:bg-emerald-700"
                }`}
              >
                {updateLoading ? "Updating..." : "Update Event"}
              </button>
              <button
                type="button"
                onClick={closeUpdateModal}
                className="w-full mt-2 py-2 font-medium rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
