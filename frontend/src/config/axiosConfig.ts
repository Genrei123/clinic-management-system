import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend's base URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Optional: Set timeout
});

export default axiosInstance;
