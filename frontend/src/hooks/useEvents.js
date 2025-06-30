// src/hooks/useEvents.js
import { useQuery } from "@tanstack/react-query";
import secureClient from "../api/secureClient";

const fetchEvents = async () => {
  const res = await secureClient.get("/events");
  return res.data;
};

export default function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
}
