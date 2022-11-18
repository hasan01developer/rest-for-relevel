const product = require('../model/product');

exports.getProducts = (req, res, next) => {
  product.findAll().then((products) => {
    res.status(200).json({
      products,
    });
  });
};

exports.getProduct = (req, res, next) => {
  product
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: 'product not found',
        });
      }
      res.status(200).json({
        product,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.deleteProduct = (req, res, next) => {
  product
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: 'product not found',
        });
      }
      product.destroy().then((result) => {
        res.status(200).json({
          message: 'product deleted successfully',
        });
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.updateProduct = (req, res, next) => {
  product
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: 'product not found',
        });
      }
      product.name = req.body.name;
      product.description = req.body.description;
      product.cost = req.body.cost;
      product.save().then((result) => {
        res.status(200).json({
          message: 'product updated successfully',
          product,
        });
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.createProduct = (req, res, next) => {
  product
    .create({
      name: req.body.name,
      description: req.body.description,
      cost: req.body.cost,
    })
    .then((result) => {
      res.status(201).json({
        message: 'product Created Successfully',
      });
    });
};
