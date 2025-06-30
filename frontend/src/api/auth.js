// src/api/auth.js
import publicClient from "./publicClient";

export function login(data) {
  return publicClient.post("/auth/login", data);
}

export function register(data) {
  return publicClient.post("/auth/register", data);
}
