import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }] 
});

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
