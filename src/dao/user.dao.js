import UserModel from '../models/user.model.js';

class UserDAO {
  async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }

  async getByEmail(email) {
    return await UserModel.findOne({ email });
  }

 
  async getByEmailRaw(email) {
    return await UserModel.findOne({ email });
  }

  async getById(id) {
    return await UserModel.findById(id);
  }

  async update(id, updateData) {
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }

  async getAll() {
    return await UserModel.find();
  }
}

export default new UserDAO();

