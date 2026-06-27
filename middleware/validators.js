const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .isEmail()
    .withMessage('Invalid Email'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};

module.exports = {
  registerValidation,
  validate
};