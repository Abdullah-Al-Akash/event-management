import axios from "axios";

const publicClient = axios.create({
  baseURL: "http://localhost:5000/api",  // your backend API base URL
});

export default publicClient;
