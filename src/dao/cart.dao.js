import { Cart } from '../models/cart.model.js';

class CartDAO {
  async create(cartData) {
    const cart = new CartModel(cartData);
    return await cart.save();
  }

  async getById(id) {
    return await CartModel.findById(id).populate('products.product');
  }

  async getAll() {
    return await CartModel.find().populate('products.product');
  }

  async update(id, updateData) {
    return await CartModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await CartModel.findByIdAndDelete(id);
  }
}

export default new CartDAO();