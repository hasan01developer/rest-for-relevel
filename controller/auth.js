const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      const error = new Error('Email already exists');
      error.statusCode = 403;
      next(error);
    } else {
      bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        }).then((result) => {
          res.status(201).json({
            message: 'Sign up successful',
          });
        });
      });
    }
  });
};

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      const error = new Error('Email not found');
      error.statusCode = 404;
      return next(error);
    } else {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          const token = jwt.sign(
            {
              name: user.name,
              id: user.id,
            },
            'cat',
            { expiresIn: '1h' }
          );
          res.status(200).json({
            message: 'Login successful',
            token: token,
          });
        } else {
          const error = new Error('Invalid password');
          error.statusCode = 403;
          next(error);
        }
      });
    }
  });
};
// const token = jwt.sign(
//   {
//     email: loadedUser.email,
//     userId: loadedUser.id,
//   },
//   'secret',
//   { expiresIn: '1h' }
// );
