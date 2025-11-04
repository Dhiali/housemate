import axios from "axios";

// Create a separate API instance for public endpoints (no auth headers)
const PublicAPI = axios.create({
  baseURL: "https://housemate-backend-234825552341.africa-south1.run.app",
});

// Test the public statistics endpoint
export const getPublicHouseStatistics = (houseId) => PublicAPI.get(`/houses/${houseId}/statistics`);
export const getPublicTasks = () => PublicAPI.get('/tasks');