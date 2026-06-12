const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');
const {
  applyForJob,
  getApplicationsForJob,
  getApplicantsForJob,
  updateApplicationStatus,
} = require('../controllers/applicationController');

router.post('/:jobId', protect, applyForJob);
router.get('/my-applications', protect, getApplicationsForJob);
router.get('/job/:jobId', protect, isAdmin, getApplicantsForJob);
router.put('/:applicationId/status', protect, isAdmin, updateApplicationStatus);
module.exports = router;
