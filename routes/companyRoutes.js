const express = require('express');
const router = express.Router();

const {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/companyController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  createCompany
);

router.get('/', getCompanies);
router.get('/:id', getCompany);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  updateCompany
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  deleteCompany
);

module.exports = router;