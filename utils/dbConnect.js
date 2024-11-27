import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    // If already connected or in the process of connecting, just return
    return;
  }

  try {
    // Make the connection
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully!');
  } catch (error) {
    // Log error if connection fails
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

// Check if the connection is reused in the development environment
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true); // Enable mongoose debugging if in development
}

export default dbConnect;
