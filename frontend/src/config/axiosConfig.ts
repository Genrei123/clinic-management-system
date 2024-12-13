import axios from "axios";

const storedToken = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${storedToken}`,
  },
});

export default axiosInstance;