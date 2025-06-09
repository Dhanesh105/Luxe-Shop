const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use environment variable for MongoDB URI, fallback to local
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/shopping";

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
