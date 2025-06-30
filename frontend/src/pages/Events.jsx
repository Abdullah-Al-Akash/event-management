import useEvents from "../hooks/useEvents";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { joinEvent } from "../api/events";

export default function Events() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: events = [], isLoading, isError } = useEvents();

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

      // ✅ Refresh events list after joining
      queryClient.invalidateQueries(["events"]);
    } catch (err) {
      Swal.fire("Oops!", err?.response?.data?.message || "Something went wrong.", "error");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-12 text-brandGreen font-semibold">Loading events...</p>;
  }

  if (isError) {
    return <p className="text-center mt-12 text-red-500">Failed to load events.</p>;
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
            <p className="text-sm text-gray-500">🗓️ {new Date(event.dateTime).toLocaleString()}</p>
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
  );
}
