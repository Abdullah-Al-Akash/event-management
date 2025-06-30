// src/api/events.js
import secureClient from "./secureClient";

export function getEvents(params) {
  return secureClient.get("/events", { params });
}

export function addEvent(data) {
  return secureClient.post("/events", data);
}

export const joinEvent = async (eventId) => {
  const res = await secureClient.post(`/events/${eventId}/join`);
  return res.data;
};