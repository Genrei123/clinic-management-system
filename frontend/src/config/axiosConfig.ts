import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to dynamically add the token to headers before each request
axiosInstance.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("token"); // Fetch the token dynamically
  if (storedToken) {
    config.headers.Authorization = `Bearer ${storedToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error); // Handle request errors
});

// Interceptor to handle errors such as 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized: Token expired or invalid. Redirecting to login.");
      localStorage.removeItem("token"); // Remove the token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Pass the error to the calling code
  }
);

export default axiosInstance;
