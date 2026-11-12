import axios from "axios";

// Create one reusable Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Run this function before every API request
api.interceptors.request.use(
  (config) => {
    // Read the JWT from browser localStorage
    const token = localStorage.getItem("token");

    // Add the token to the request if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the updated request configuration
    return config;
  },
  (error) => {
    // Forward request errors
    return Promise.reject(error);
  },
);

export default api;
