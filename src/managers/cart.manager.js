import CartDAO from '../dao/cart.dao.js';
import ProductDAO from '../dao/product.dao.js';
import TicketService from '../services/ticket.service.js';

class CartManager {
  async purchaseCart(cartId, userEmail) {
    const cart = await CartDAO.getById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    const processedProducts = [];
    const unprocessedProducts = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await ProductDAO.getById(item.product);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await ProductDAO.update(product._id, { stock: product.stock });
        totalAmount += product.price * item.quantity;
        processedProducts.push(item);
      } else {
        unprocessedProducts.push(item);
      }
    }

    const ticket = await TicketService.createTicket(userEmail, totalAmount);

    
    cart.products = unprocessedProducts;
    await CartDAO.update(cartId, { products: cart.products });

    return {
      message: 'Compra realizada',
      ticket,
      productosNoProcesados: unprocessedProducts,
    };
  }

}

export default new CartManager();