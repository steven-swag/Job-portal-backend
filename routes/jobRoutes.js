const express = require('express');

const router = express.Router();

const protect = require('../middleware/authMiddleware');

const isAdmin = require('../middleware/adminMiddleware');

const {
  createJob,
  getjobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs
} = require('../controllers/jobController');

router.post('/', protect, isAdmin, createJob);
router.get('/', getjobs);
router.get('/my-jobs', protect, isAdmin, getMyJobs);
router.get('/:id', getJobById);
router.put('/:id', protect, isAdmin, updateJob);
router.delete('/:id', protect, isAdmin, deleteJob);

module.exports = router;
