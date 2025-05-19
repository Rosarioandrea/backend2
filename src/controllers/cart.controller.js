import CartManager from '../managers/cart.manager.js';


export const getCarts = async (req, res) => {
  try {
    const carts = await CartManager.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener carritos' });
  }
};


export const getCartById = async (req, res) => {
  try {
    const cart = await CartManager.getCartById(req.params.id);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
};


export const createCart = async (req, res) => {
  try {
    const cart = await CartManager.createCart(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear carrito' });
  }
};


export const updateCart = async (req, res) => {
  try {
    const cart = await CartManager.updateCart(req.params.id, req.body);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar carrito' });
  }
};


export const deleteCart = async (req, res) => {
  try {
    const result = await CartManager.deleteCart(req.params.id);
    if (!result) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json({ message: 'Carrito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar carrito' });
  }
};


export const purchaseCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const userEmail = req.user.email; 

    const result = await CartManager.purchaseCart(cartId, userEmail);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en compra:', error);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
};
