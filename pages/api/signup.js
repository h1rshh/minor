// pages/api/signup.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  // To hash passwords
import { generateToken } from '../../utils/jwt';  // Import the token generation function

// Define the Mongoose schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Connect to MongoDB
const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection.asPromise();
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, userType } = req.body;

    // Validate input
    if (!name || !email || !password || !userType) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Connect to MongoDB
      await connectMongo();

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user
      const newUser = new User({ name, email, password: hashedPassword, userType });

      // Save the new user to the database
      await newUser.save();

      // Generate JWT token after user is created
      const token = generateToken(newUser);

      // Send back the response with the JWT token
      res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
