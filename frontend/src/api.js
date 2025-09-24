import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // backend URL
});

// Example API functions
export const getUsers = () => API.get("/users");
export const addUser = (user) => API.post("/users", user);
export const getTasks = () => API.get("/tasks");
export const addTask = (task) => API.post("/tasks", task);
