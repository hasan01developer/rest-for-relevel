const router = require('express').Router();

const categoryController = require('../controller/category');
const isAuth = require('../middleware/is-auth');

router.get('/categories', categoryController.getCategories);

router.get('/category/:id', categoryController.getCategory);

router.delete('/category/:id', isAuth, categoryController.deleteCategory);

router.post('/category', isAuth, categoryController.createCategory);

router.put('/category/:id', isAuth, categoryController.updateCategory);

module.exports = router;
