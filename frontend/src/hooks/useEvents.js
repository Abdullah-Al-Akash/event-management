import { useQuery } from "@tanstack/react-query";
import secureClient from "../api/secureClient";

// ✅ Default fetch (no filter or search)
export default function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await secureClient.get("/events");
      return res.data;
    },
  });
}

// ✅ Filtered version with search & filter
export function useFilteredEvents({ search = "", filter = "" }) {
  return useQuery({
    queryKey: ["events", search, filter],
    queryFn: async () => {
      const res = await secureClient.get("/events", {
        params: { search, filter },
      });
      return res.data;
    },
  });
}
