
import api from "./api";

// Fetch all tasks belonging to the logged-in user
export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

// Update an existing task
export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

// Delete an existing task
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
