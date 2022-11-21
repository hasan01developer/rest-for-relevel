const router = require('express').Router();

const cartController = require('../controller/cart');
const isAuth = require('../middleware/is-auth');

router.get('/cart/:id', cartController.getCart);

module.exports = router;
