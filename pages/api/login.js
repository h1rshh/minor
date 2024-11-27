import dbConnect from '../../utils/dbConnect';  // Make sure this exists
import User from '../../models/User';  // Import the User model
import bcrypt from 'bcryptjs';  // For password comparison
import jwt from 'jsonwebtoken';  // For creating the JWT token

const loginHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await dbConnect();  // Connect to DB

      // Find the user in the database by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });  // If user is not found
      }

      // Compare passwords using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid password' });  // If passwords don't match
      }

      // Create a JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.userType },  // Include the user role in the token payload
        process.env.JWT_SECRET,  // Ensure this is set in your .env file
        { expiresIn: '1h' }
      );

      // Send back the token and the user's role as a JSON response
      res.status(200).json({ message: 'Login successful', token, role: user.userType });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });  // If there's a server error
    }
  } else {
    // Handle non-POST requests
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default loginHandler;
