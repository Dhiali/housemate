export const updateUserPreferredContact = (id, preferred_contact) => {
  console.log('updateUserPreferredContact called with:', { id, preferred_contact });
  return API.put(`/users/${id}/preferred_contact`, { preferred_contact });
};
export const updateUserName = (id, name) => {
  console.log('updateUserName called with:', { id, name });
  return API.put(`/users/${id}/name`, { name });
};

export const updateUserEmail = (id, email) => {
  console.log('updateUserEmail called with:', { id, email });
  return API.put(`/users/${id}/email`, { email });
};
export const login = (data) => API.post('/login', data);
// Auth
export const register = (user) => API.post('/register', user);
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://housemate-backend-694893036218.us-central1.run.app",
});

// Houses
export const getHouses = () => API.get("/houses");
export const getHouse = (id) => API.get(`/houses/${id}`);
export const getHouseStatistics = (houseId) => API.get(`/houses/${houseId}/statistics`);
export const addHouse = (house) => API.post("/houses", house);
export const updateHouse = (id, data) => API.put(`/houses/${id}`, data);
export const deleteHouse = (id) => API.delete(`/houses/${id}`);

// Users
export const getUsers = () => API.get("/users");
export const getUser = (id) => API.get(`/users/${id}`);
export const getHousemates = (houseId) => API.get(`/houses/${houseId}/users`);
export const addUser = (user) => API.post("/users", user);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const updateUserBio = (id, bio) => {
  console.log('updateUserBio called with:', { id, bio });
  return API.put(`/users/${id}/bio`, { bio });
};

export const updateUserPhone = (id, phone) => {
  console.log('updateUserPhone called with:', { id, phone });
  return API.put(`/users/${id}/phone`, { phone });
};

export const updateUserPrivacy = (id, privacySettings) => {
  console.log('updateUserPrivacy called with:', { id, privacySettings });
  return API.put(`/users/${id}/privacy`, privacySettings);
};

export const deleteUser = (id) => API.delete(`/users/${id}`);

// Tasks
export const getTasks = (houseId) => API.get(`/tasks?house_id=${houseId}`);
export const getTask = (id) => API.get(`/tasks/${id}`);
export const addTask = (task) => API.post("/tasks", task);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const getTaskHistory = (id) => API.get(`/tasks/${id}/history`);

// Bills
export const getBills = (house_id) => API.get(`/bills?house_id=${house_id}`);
export const getBill = (id) => API.get(`/bills/${id}`);
export const addBill = (bill) => API.post("/bills", bill);
export const updateBill = (id, data) => API.put(`/bills/${id}`, data);
export const deleteBill = (id, deleted_by) => API.delete(`/bills/${id}`, { data: { deleted_by } });
export const payBill = (id, payment_data) => API.put(`/bills/${id}/pay`, payment_data);

// Schedule
export const getSchedule = () => API.get("/schedule");
export const getScheduleItem = (id) => API.get(`/schedule/${id}`);
export const addSchedule = (item) => API.post("/schedule", item);
export const updateSchedule = (id, data) => API.put(`/schedule/${id}`, data);
export const deleteSchedule = (id) => API.delete(`/schedule/${id}`);

// User Statistics
export const getUserStatistics = (userId) => API.get(`/users/${userId}/statistics`);
export const getUserCompletedTasks = (userId) => API.get(`/users/${userId}/tasks/completed`);
export const getUserPendingTasks = (userId) => API.get(`/users/${userId}/tasks/pending`);
export const getUserContributedBills = (userId) => API.get(`/users/${userId}/bills/contributed`);

// Recent Activities
export const getRecentActivities = (houseId) => API.get(`/houses/${houseId}/activities`);
