const Cart = require('../model/cart');

exports.getCart = async (req, res, next) => {
  console.log(req.params.id);
  const cart = await Cart.findByPk(req.params.id);

  if (!cart) {
    return res.status(404).json({
      message: 'Cart not found',
    });
  }
  const products = await cart.getProducts();
  //   const cartItems = await cart.

  let totalCost = 0;

  for (let product of products) {
    totalCost += +product.cost * +product.cartItem.quantity;
    console.log('hiiiix', totalCost);
  }

  return res.status(200).json({
    products: products,
    totalCost: totalCost,
  });
};
