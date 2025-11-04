import axios from "axios";

const API = axios.create({
  baseURL: "https://housemate-backend-234825552341.africa-south1.run.app", // backend URL in africa-south1
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
