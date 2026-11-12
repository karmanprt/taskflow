// Import our shared Axios instance
import api from "./api";

// Send registration details to the backend
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);

  // Return only the response body
  return response.data;
};

// Send login details to the backend
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);

  // Return only the response body
  return response.data;
};
