import { Product } from '../models/product.model.js';

class ProductDAO {
  async create(productData) {
    const product = new ProductModel(productData);
    return await product.save();
  }

  async getById(id) {
    return await ProductModel.findById(id);
  }

  async getAll() {
    return await ProductModel.find();
  }

  async update(id, updateData) {
    return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default new ProductDAO();
