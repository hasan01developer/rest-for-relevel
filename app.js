const bodyParser = require('body-parser');
const express = require('express');

const categoryRoutes = require('./routes/category');
const authRoutes = require('./routes/auth');
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json());

app.use(categoryRoutes);
app.use(authRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message,
  });
});

sequelize
  .sync()
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
