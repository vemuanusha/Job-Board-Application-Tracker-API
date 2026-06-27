const express = require('express');
const router = express.Router();

const {
  register,
  login
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const {
  registerValidation,
  validate
} = require('../middleware/validators');

router.post(
  '/register',
  registerValidation,
  validate,
  register
);

router.post('/login', login);

router.get(
  '/profile',
  authMiddleware,
  (req, res) => {
    res.json({
      user: req.user
    });
  }
);

router.get(
  '/admin',
  authMiddleware,
  roleMiddleware('admin'),
  (req, res) => {
    res.json({
      message: 'Welcome Admin'
    });
  }
);

module.exports = router;