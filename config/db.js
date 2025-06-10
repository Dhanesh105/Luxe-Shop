const mongoose = require('mongoose');

// Cache the database connection
let cachedConnection = null;

const connectDB = async () => {
    // If we have a cached connection and it's ready, use it
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('Using cached database connection');
        return cachedConnection;
    }

    try {
        // Use environment variable for MongoDB URI, fallback to local
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/shopping";

        if (!mongoURI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

        console.log('Connecting to MongoDB...');

        // Optimized connection options for serverless
        const connection = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferCommands: false, // Disable mongoose buffering
            bufferMaxEntries: 0 // Disable mongoose buffering
        });

        cachedConnection = connection;
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        return connection;
    } catch (err) {
        console.error('Database connection error:', err.message);
        cachedConnection = null;

        // Don't exit process in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
        throw err;
    }
}

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
    cachedConnection = null;
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
    cachedConnection = null;
});

module.exports = connectDB;
