const express = require('express');
const router = express.Router();

const {
  applyJob,
  myApplications,
  updateStatus
} = require('../controllers/applicationController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/',
  authMiddleware,
  roleMiddleware('user', 'admin'),
  applyJob
);

router.get(
  '/my',
  authMiddleware,
  myApplications
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  updateStatus
);

module.exports = router;