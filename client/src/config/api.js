// API Configuration for LuxeShop Frontend

// Backend API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://luke-shop-backend.vercel.app'
    : 'http://localhost:5000');

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/auth`,
  REGISTER: `${API_BASE_URL}/api/user`,
  USER_PROFILE: `${API_BASE_URL}/api/user/profile`,
  
  // Cart Management
  CART: `${API_BASE_URL}/api/cart`,
  CART_ITEM: (id) => `${API_BASE_URL}/api/cart/${id}`,
  
  // Order Management
  ORDER: `${API_BASE_URL}/api/order`,
  ORDER_ITEM: (id) => `${API_BASE_URL}/api/order/${id}`,
  
  // Health Check
  HEALTH: `${API_BASE_URL}/api/health`,
  
  // API Root
  API_ROOT: `${API_BASE_URL}/api`
};

// Default API configuration
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

export default API_BASE_URL;
