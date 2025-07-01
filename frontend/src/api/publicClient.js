import axios from "axios";

const publicClient = axios.create({
  baseURL: "https://event-management-7dxr.onrender.com/api",  // your backend API base URL
});

export default publicClient;
