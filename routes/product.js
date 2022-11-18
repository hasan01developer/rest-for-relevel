const router = require('express').Router();
const { body } = require('express-validator');

const productController = require('../controller/product');
const isAuth = require('../middleware/is-auth');

router.get('/products', productController.getProducts);

router.get('/product/:id', productController.getProduct);

router.delete('/product/:id', isAuth, productController.deleteProduct);

router.post(
  '/product',
  isAuth,
  body('name').not().isEmpty(),
  productController.createProduct
);

router.put('/product/:id', isAuth, productController.updateProduct);

module.exports = router;
