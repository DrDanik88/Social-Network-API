const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/social-network-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection successful.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Export the connection function and the Mongoose connection instance
module.exports = {
  connectDatabase,
  db: mongoose.connection,
};



