const router = require('express').Router();

const { body } = require('express-validator');

const authController = require('../controller/auth');

router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 10 }),
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
