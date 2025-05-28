import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName:{ type: String },
  lastName: { type: String },
  role:     { type: String, enum: ['user','admin'], default: 'user' }
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;    
