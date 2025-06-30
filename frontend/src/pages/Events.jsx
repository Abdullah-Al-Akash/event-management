import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { joinEvent } from "../api/events";
import { useFilteredEvents } from "../hooks/useEvents";

export default function Events() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // State for search and filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  // Dynamic hook with params
  const { data: events = [], isLoading, isError } = useFilteredEvents({ search, filter });

  const handleJoin = async (eventId) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to join this event.",
        showCancelButton: true,
        confirmButtonText: "Login Now",
        cancelButtonText: "Cancel",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    try {
      await joinEvent(eventId);
      Swal.fire("Joined!", "You’ve successfully joined the event.", "success");
      queryClient.invalidateQueries(["events", search, filter]);
    } catch (err) {
      Swal.fire("Oops!", err?.response?.data?.message || "Something went wrong.", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Filter controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <input
          type="text"
          placeholder="Search by title..."
          className="px-4 py-2 border rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-brandGreen"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brandGreen"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
        </select>
      </div>

      {/* Events display */}
      {isLoading ? (
        <p className="text-center mt-12 text-brandGreen font-semibold">Loading events...</p>
      ) : isError ? (
        <p className="text-center mt-12 text-red-500">Failed to load events.</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {events.map((event) => {
            const alreadyJoined = event.attendees?.includes(user?._id);
            return (
              <motion.div
                key={event._id}
                className="bg-white shadow-md border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl font-bold text-brandGreen">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-1">By: {event.name}</p>
                <p className="text-sm text-gray-500">📍 {event.location}</p>
                <p className="text-sm text-gray-500">
                  🗓️ {new Date(event.dateTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                <p className="text-sm font-semibold text-gray-600 mt-2">
                  Attendees: {event.attendeeCount}
                </p>
                <button
                  onClick={() => handleJoin(event._id)}
                  disabled={alreadyJoined}
                  className={`w-full mt-4 text-white font-medium py-2 rounded-md transition ${
                    alreadyJoined
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-brandGreen hover:bg-emerald-700"
                  }`}
                >
                  {alreadyJoined ? "Already Joined" : "Join Event"}
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
