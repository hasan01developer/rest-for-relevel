const router = require('express').Router();

const categoryController = require('../controller/category');

router.get('/categories', categoryController.getCategories);

router.get('/category/:id', categoryController.getCategory);

router.delete('/category/:id', categoryController.deleteCategory);

router.post('/category', categoryController.createCategory);

router.put('/category/:id', categoryController.updateCategory);

module.exports = router;
