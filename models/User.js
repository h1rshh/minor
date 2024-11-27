const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // To hash passwords

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  // Remove extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure no duplicate emails
    lowercase: true,  // Store emails in lowercase
    trim: true,  // Remove extra spaces
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Enforce a minimum password length
  },
  userType: {
    type: String,
    required: true,
    enum: ['client', 'worker'],  // Restrict user types to client or worker
  },
});

// Password hashing before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Only hash if password is new or modified
  try {
    const salt = await bcrypt.genSalt(10);  // Generate a salt
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Compare provided password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  // Compare password
};

// Check if the model already exists to prevent overwriting it
const User = mongoose.models.User || mongoose.model('User', userSchema);  // Avoid overwriting the model

module.exports = User;  // Export the model for use in other parts of the app
