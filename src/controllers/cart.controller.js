import CartDAO from '../dao/cart.dao.js';
import ProductDAO from '../dao/product.dao.js';
import TicketService from '../services/ticket.service.js';

// Obtener todos los carritos
export const getCarts = async (req, res) => {
  try {
    const carts = await CartDAO.getAll();
    return res.json(carts);
  } catch (error) {
    console.error('GET ALL CARTS ERROR:', error);
    return res.status(500).json({ error: error.message || 'Error al obtener carritos' });
  }
};

// Crear un nuevo carrito
export const createCart = async (req, res) => {
  try {
    const newCart = await CartDAO.create();
    return res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
  } catch (error) {
    console.error('CREATE CART ERROR:', error);
    return res.status(500).json({ error: error.message || 'Error al crear carrito' });
  }
};

// Obtener carrito por ID
export const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await CartDAO.getById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    return res.json(cart);
  } catch (error) {
    console.error('GET CART ERROR:', error);
    return res.status(500).json({ error: error.message || 'Error al obtener carrito' });
  }
};

// Actualizar carrito
export const updateCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const updated = await CartDAO.update(cid, { products });
    if (!updated) return res.status(404).json({ error: 'Carrito no encontrado' });
    return res.json({ message: 'Carrito actualizado correctamente', cart: updated });
  } catch (error) {
    console.error('UPDATE CART ERROR:', error);
    return res.status(500).json({ error: error.message || 'Error al actualizar carrito' });
  }
};

// Agregar producto al carrito
export const addProductToCart = async (req, res) => {
  const { cid } = req.params;
  const { productId, quantity } = req.body;
  try {
    const cart = await CartDAO.getById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const product = await ProductDAO.getById(productId);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    const existing = cart.products.find(
      p => p.product._id.toString() === productId
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    const updatedCart = await CartDAO.update(cid, { products: cart.products });
    return res.json({ message: 'Producto agregado al carrito', cart: updatedCart });
  } catch (error) {
    console.error('ADD TO CART ERROR:', error);
    return res.status(500).json({ error: error.message || 'Error al agregar producto' });
  }
};

// Finalizar compra: generar ticket, actualizar stock y carrito
export const purchaseCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await CartDAO.getById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    let totalAmount = 0;
    const unavailable = [];

    for (const item of cart.products) {
      const product = await ProductDAO.getById(item.product._id);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await ProductDAO.update(product._id, { stock: product.stock });
        totalAmount += product.price * item.quantity;
      } else {
        unavailable.push(product._id);
      }
    }

    let ticket = null;
    if (totalAmount > 0) {
      ticket = await TicketService.createTicket(totalAmount, req.user.email);
    }

    const remaining = cart.products.filter(item =>
      unavailable.includes(item.product._id)
    );
    await CartDAO.update(cid, { products: remaining });

    return res.json({
      message: 'Compra finalizada',
      ticket,
      unavailableProducts: unavailable
    });
  } catch (error) {
    console.error('PURCHASE CART ERROR:', error);
    return res.status(500).json({ error: error.message || 'Error al procesar compra' });
  }
};

// Eliminar carrito
export const deleteCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const deleted = await CartDAO.delete(cid);
    if (!deleted) return res.status(404).json({ error: 'Carrito no encontrado' });
    return res.json({ message: 'Carrito eliminado correctamente' });
  } catch (error) {
    console.error('DELETE CART ERROR:', error);
    return res.status(500).json({ error: error.message || 'Error al eliminar carrito' });
  }
};