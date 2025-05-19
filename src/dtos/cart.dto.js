export class CartDTO {
  constructor(cart) {
    this.id = cart._id;
    this.userId = cart.userId;
    this.products = cart.products.map(item => ({
      product: {
        id: item.product._id,
        title: item.product.title,
        price: item.product.price,
      },
      quantity: item.quantity,
    }));
    this.createdAt = cart.createdAt;
    this.updatedAt = cart.updatedAt;
  }
}