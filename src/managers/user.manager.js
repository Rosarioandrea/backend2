import UserDAO from '../dao/user.dao.js';
import { UserDTO } from '../dtos/user.dto.js';
import bcrypt from 'bcrypt';

class UserManager {
 
  async registerUser(userData) {
    const existing = await UserDAO.getByEmail(userData.email);
    if (existing) throw new Error('El email ya está registrado');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userToSave = { ...userData, password: hashedPassword, role: userData.role || 'user' };

    const user = await UserDAO.create(userToSave);
    return new UserDTO(user);
  }

  
  async getUserByEmail(email) {
    const user = await UserDAO.getByEmail(email);
    if (!user) return null;
    return new UserDTO(user);
  }

  async getUserById(id) {
    const user = await UserDAO.getById(id);
    if (!user) return null;
    return new UserDTO(user);
  }

  async getAllUsers() {
    const users = await UserDAO.getAll();
    return users.map(u => new UserDTO(u));
  }

  async updateUser(id, updateData) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const updated = await UserDAO.update(id, updateData);
    if (!updated) return null;
    return new UserDTO(updated);
  }

  async deleteUser(id) {
    return await UserDAO.delete(id);
  }


  async _getRawUserByEmail(email) {
    return await UserDAO.getByEmailRaw(email);
  }
}

export default new UserManager();
