import axios from "axios";

const API = axios.create({
  baseURL: "https://housemate-backend-694893036218.us-central1.run.app", // backend URL
});

// Example API functions
export const getUsers = () => API.get("/users");
export const addUser = (user) => API.post("/users", user);
export const getTasks = () => API.get("/tasks");
export const addTask = (task) => API.post("/tasks", task);
