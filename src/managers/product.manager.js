import ProductDAO from '../dao/product.dao.js';
import { ProductDTO } from '../dtos/product.dto.js';

class ProductManager {
  async createProduct(productData) {
    const product = await ProductDAO.create(productData);
    return new ProductDTO(product);
  }

  async getProductById(id) {
    const product = await ProductDAO.getById(id);
    if (!product) return null;
    return new ProductDTO(product);
  }

  async getAllProducts() {
    const products = await ProductDAO.getAll();
    return products.map(product => new ProductDTO(product));
  }

  async updateProduct(id, updateData) {
    const updatedProduct = await ProductDAO.update(id, updateData);
    if (!updatedProduct) return null;
    return new ProductDTO(updatedProduct);
  }

  async deleteProduct(id) {
    return await ProductDAO.delete(id);
  }
}

export default new ProductManager();