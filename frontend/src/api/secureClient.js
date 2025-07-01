import axios from "axios";

const secureClient = axios.create({
  baseURL: "https://event-management-7dxr.onrender.com/api",
});

// Add a request interceptor to attach the token automatically
secureClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default secureClient;
