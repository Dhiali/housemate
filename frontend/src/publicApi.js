import axios from "axios";

// Create a separate API instance for public endpoints (no auth headers)
const PublicAPI = axios.create({
  baseURL: "http://localhost:5000",
});

// Test the public statistics endpoint
export const getPublicHouseStatistics = (houseId) => PublicAPI.get(`/houses/${houseId}/statistics`);
export const getPublicTasks = () => PublicAPI.get('/tasks');