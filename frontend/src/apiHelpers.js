import axios from "axios";

const API = axios.create({
  baseURL: "https://housemate-backend-234825552341.africa-south1.run.app",
});

// Auth
export const login = (data) => API.post('/login', data);
export const register = (user) => API.post('/register', user);

// Houses
export const getHouses = () => API.get("/houses");
export const getHouse = (id) => API.get(`/houses/${id}`);
export const addHouse = (house) => API.post("/houses", house);
export const updateHouse = (id, data) => API.put(`/houses/${id}`, data);
export const deleteHouse = (id) => API.delete(`/houses/${id}`);

// Users
export const getUsers = () => API.get("/users");
export const getUser = (id) => API.get(`/users/${id}`);
export const addUser = (user) => API.post("/users", user);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Tasks
export const getTasks = (houseId) => API.get(`/tasks?house_id=${houseId}`);
export const getTask = (id) => API.get(`/tasks/${id}`);
export const addTask = (task) => API.post("/tasks", task);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// Bills
export const getBills = (houseId) => API.get(`/bills?house_id=${houseId}`);
export const getBill = (id) => API.get(`/bills/${id}`);
export const addBill = (bill) => API.post("/bills", bill);
export const updateBill = (id, data) => API.put(`/bills/${id}`, data);
export const deleteBill = (id) => API.delete(`/bills/${id}`);
export const payBill = (billId, paymentData) => API.put(`/bills/${billId}/pay`, paymentData);
export const getBillPayments = (billId) => API.get(`/bills/${billId}/payments`);

// House-specific endpoints
export const getHouseStatistics = (houseId) => API.get(`/houses/${houseId}/statistics`);
export const getHousemates = (houseId) => API.get(`/houses/${houseId}/users`);
export const getHouseActivities = (houseId) => API.get(`/houses/${houseId}/activities`);
export const getRecentActivities = (houseId) => API.get(`/houses/${houseId}/activities`);

// User-specific endpoints  
export const getUserStatistics = (userId) => API.get(`/users/${userId}/statistics`);
export const getUserCompletedTasks = (userId) => API.get(`/users/${userId}/tasks/completed`);
export const getUserPendingTasks = (userId) => API.get(`/users/${userId}/tasks/pending`);
export const getUserContributedBills = (userId) => API.get(`/users/${userId}/bills/contributed`);

// User update endpoints
export const updateUserBio = (userId, bio) => API.put(`/users/${userId}/bio`, { bio });
export const updateUserPhone = (userId, phone) => API.put(`/users/${userId}/phone`, { phone });
export const updateUserName = (userId, name) => API.put(`/users/${userId}/name`, { name });
export const updateUserEmail = (userId, email) => API.put(`/users/${userId}/email`, { email });
export const updateUserPreferredContact = (userId, preferred_contact) => API.put(`/users/${userId}/preferred_contact`, { preferred_contact });

// Schedule
export const getSchedule = (houseId) => API.get(`/schedule${houseId ? `?house_id=${houseId}` : ''}`);
export const getScheduleItem = (id) => API.get(`/schedule/${id}`);
export const addSchedule = (item) => API.post("/schedule", item);
export const addEvent = (eventData) => API.post("/schedule", eventData);
export const updateSchedule = (id, data) => API.put(`/schedule/${id}`, data);
export const deleteSchedule = (id) => API.delete(`/schedule/${id}`);

// Debug endpoint to check schedule table
// Debug helpers
export const checkScheduleTable = async () => {
  const response = await API.get('/debug/schedule-table');
  return response;
};

// New debug endpoint to test schedule creation
export const debugCreateEvent = async (eventData) => {
  const response = await API.post('/debug/create-event', eventData);
  return response;
};
