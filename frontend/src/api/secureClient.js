import axios from "axios";

const secureClient = axios.create({
  baseURL: "http://localhost:5000/api",
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
