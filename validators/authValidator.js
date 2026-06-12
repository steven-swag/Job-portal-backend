const { body } = require('express-validator');

const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
];

module.exports = { validateLogin };
