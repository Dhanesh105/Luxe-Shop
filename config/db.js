const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use environment variable for MongoDB URI, fallback to local
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/shopping";

        // Updated connection options for newer Mongoose versions
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (err) {
        console.error('Database connection error:', err.message);
        // Don't exit process in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
        throw err;
    }
}

module.exports = connectDB;
