const bodyParser = require('body-parser');
const express = require('express');

const categoryRoutes = require('./routes/category');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const sequelize = require('./util/database');
const Product = require('./model/product');
const User = require('./model/user');
const Order = require('./model/order');
const Category = require('./model/category');
const path = require('path');
const Role = require('./model/role');
const UserRole = require('./model/userRole.js');
const Cart = require('./model/cart');
const CartItem = require('./model/cartItem');

const app = express();

//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/home', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(categoryRoutes);
app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);

app.use((error, req, res, next) => {
  console.log('check');
  res.status(error.statusCode || 500).json({
    message: error.message,
  });
});

User.hasOne(Cart);

Product.belongsToMany(User, { through: Order });

Category.hasMany(Product);

User.belongsToMany(Role, { through: UserRole });

Role.belongsToMany(User, { through: UserRole });

Cart.belongsToMany(Product, { through: CartItem });

Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
