import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { joinEvent } from "../api/events";
import { useFilteredEvents } from "../hooks/useEvents";
import {
  CalendarDays,
  MapPin,
  UserRound,
  Users,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";

export default function Events() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [joiningId, setJoiningId] = useState(null);

  const {
    data: events = [],
    isLoading,
    isError,
  } = useFilteredEvents({ search, filter });

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
      setJoiningId(eventId);
      await joinEvent(eventId);
      Swal.fire("Joined!", "You’ve successfully joined the event.", "success");
      queryClient.invalidateQueries(["events", search, filter]);
    } catch (err) {
      Swal.fire(
        "",
        err?.response?.data?.message || "Something went wrong.",
        "warning"
      );
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
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
      <SectionTitle title={"🌿Join Exciting Events"}></SectionTitle>
      {/* Events display */}
      {isLoading ? (
        <p className="text-center mt-12 text-brandGreen font-semibold">
          Loading events...
        </p>
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
            const alreadyJoined = event.attendees?.some(
              (attendee) => attendee === user?._id || attendee?._id === user?._id
            );

            return (
              <motion.div
                key={event._id}
                className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl h-full"
                whileHover={{ scale: 1.02 }}
              >
                {/* Card Body */}
                <div className="flex flex-col space-y-3 flex-grow">
                  <h3 className="text-2xl font-semibold text-brandGreen mb-1">
                    {event.title}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <UserRound size={16} /> <span>By: {event.name}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <MapPin size={16} /> <span>{event.location}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <CalendarDays size={16} />{" "}
                    <span>{new Date(event.dateTime).toLocaleString()}</span>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-4">
                    {event.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-600 font-medium gap-2">
                    <Users size={16} />{" "}
                    <span>Attendees: {event.attendeeCount}</span>
                  </div>
                </div>

                {/* Already Joined Badge or Join Button */}
                {alreadyJoined ? (
                  <div className="mt-6 text-center text-md font-semibold text-green-600  py-2 rounded-xl">
                    ✅ Already Joined
                  </div>
                ) : (
                  <button
                    onClick={() => handleJoin(event._id)}
                    disabled={joiningId === event._id}
                    className={`w-full mt-6 text-white font-semibold py-2 rounded-xl transition duration-300 flex items-center justify-center gap-2 ${
                      joiningId === event._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-brandGreen hover:bg-emerald-700"
                    }`}
                  >
                    {joiningId === event._id ? (
                      <>
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
                        Joining...
                      </>
                    ) : (
                      "Join Event"
                    )}
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}