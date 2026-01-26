import axios from 'axios';
import authService from './authService';
import API_BASE_URL from '@/config/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401/403 and retry logic
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // Here you can add token refresh logic if applicable
      // For now, just reject
      console.log('Authentication error, please login again.');
    }
    console.log('Error response:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosInstance;
