import axios from 'axios';
import { getBaseUrl } from '../services/base-url';

/**
 * Creates a configured axios instance for API requests
 */
const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: getBaseUrl(),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Request interceptor for authentication
  instance.interceptors.request.use(
    (config) => {
      // Get token from storage (localStorage, sessionStorage, etc.)
      const token = localStorage.getItem('token');

      // If token exists, add it to the headers
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for handling errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle specific error status codes if needed
      if (error.response?.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        localStorage.removeItem('token');
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();
