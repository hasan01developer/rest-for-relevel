const bodyParser = require('body-parser');
const express = require('express');

const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const sequelize = require('./util/database');
const Product = require('./model/product');
const User = require('./model/user');
const Order = require('./model/order');

const app = express();

app.use(bodyParser.json());

app.use(categoryRoutes);
app.use(productRoutes);
app.use(authRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message,
  });
});

Product.belongsToMany(User, { through: Order });

sequelize
  .sync({ force: true })
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
