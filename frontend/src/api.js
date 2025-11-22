import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // Local backend URL
});

// Example API functions
export const getUsers = () => API.get("/users");
export const addUser = (user) => API.post("/users", user);
export const getTasks = (options = {}) => {
  const params = new URLSearchParams();
  if (options.viewAll) {
    params.append('view_all', 'true');
  }
  const queryString = params.toString();
  return API.get(`/tasks${queryString ? `?${queryString}` : ''}`);
};
export const addTask = (task) => API.post("/tasks", task);
