import UserModel from '../models/user.model.js';

export const getAllUsers = () => UserModel.find();

export const getUserById = (id) => UserModel.findById(id);

export const createUser = (userData) => {
  const user = new UserModel(userData);
  return user.save();
};

export const updateUser = (id, userData) =>
  UserModel.findByIdAndUpdate(id, userData, { new: true });

export const deleteUser = (id) => UserModel.findByIdAndDelete(id);