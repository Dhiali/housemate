// Simple test to verify the API endpoints work
import axios from 'axios';

const API_BASE = 'http://localhost:3000';

async function testTaskCreation() {
  try {
    console.log('Testing task creation...');
    
    const taskData = {
      house_id: 1,
      title: 'Test Task',
      description: 'This is a test task',
      category: 'cleaning',
      location: 'Kitchen',
      due_date: '2025-09-26',
      priority: 'high',
      assigned_to: 1,
      assigned_by: 1
    };

    const response = await axios.post(`${API_BASE}/tasks`, taskData);
    console.log('Task created successfully:', response.data);
    
    // Test fetching tasks
    console.log('Fetching tasks...');
    const tasksResponse = await axios.get(`${API_BASE}/tasks`);
    console.log('Tasks fetched:', tasksResponse.data);
    
    return true;
  } catch (error) {
    console.error('Error testing API:', error.response?.data || error.message);
    return false;
  }
}

testTaskCreation();