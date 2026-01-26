const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://krishi-backend-3.onrender.com';

export const API_ENDPOINTS = {
  auth: {
    signup: '/api/user/signup',
    signin: '/api/user/signin',
    me: '/api/user/me',
    logout: '/api/user/logout'
  },
  features: {
    cropRecommend: '/api/crop/recommend',
    fertilizerRecommend: '/api/fertilizer/recommend',
    diseaseDetect: '/api/disease/detect'
  },
  health: '/health'
};

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
};

export default API_BASE_URL;