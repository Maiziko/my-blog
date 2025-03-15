// src/services/api.ts
import axios from 'axios';

const baseURL = 'https://gorest.co.in/public/v2';

// Create an axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Add your GoRest token here
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`
  }
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error responses
    const { status, data } = error.response || {};
    
    if (status === 401) {
      console.error('Unauthorized: Please check your GoRest token');
    } else if (status === 429) {
      console.error('Rate limited: Too many requests');
    }
    
    return Promise.reject(error);
  }
);

export default api;