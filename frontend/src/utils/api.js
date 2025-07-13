import axios from 'axios';
import { getToken, logout } from './auth';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      logout();
    }
    return Promise.reject(error);
  }
);

export default api;
