import ProductManager from '../managers/product.manager.js';

export const getProducts = async (req, res) => {
  try {
    const products = await ProductManager.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductManager.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await ProductManager.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear producto' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await ProductManager.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar producto' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await ProductManager.deleteProduct(req.params.id);
    if (!result) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};