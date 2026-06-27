const express = require('express');
const router = express.Router();

const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  createJob
);

router.get('/', getJobs);
router.get('/:id', getJob);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  updateJob
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  deleteJob
);

module.exports = router;