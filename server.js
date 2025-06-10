const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const connectDB = require('./config/db');

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
});

// Connect to database with error handling
let dbConnected = false;
const initializeDB = async () => {
    if (!dbConnected) {
        try {
            await connectDB();
            dbConnected = true;
        } catch (error) {
            console.error('Failed to connect to database:', error);
        }
    }
};

// Initialize database connection
initializeDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://luxe-shop-lac.vercel.app',
  credentials: true
}));
app.use(express.json());

app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/cart',require('./routes/api/cart'));
app.use('/api/order',require('./routes/api/order'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'LuxeShop Backend API',
    status: 'success',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      user: '/api/user',
      cart: '/api/cart',
      order: '/api/order'
    }
  });
});

// API root route
app.get('/api', (req, res) => {
  res.json({ message: 'Shopping API Server is running!', status: 'success' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'Connected' : 'Disconnected'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Export the Express API for Vercel
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
