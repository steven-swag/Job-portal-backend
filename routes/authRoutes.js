const express = require('express');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

const { sendOTP, verifyOTP, getMe } = require('../controllers/authController');
const { validateLogin } = require('../validators/authValidator');
const validationMiddleware = require('../middleware/validationMiddleware');
const rateLimiter = require('../middleware/rateLimiter');
const { testCookie } = require('../controllers/authController');

router.post(
  '/send-otp',
  rateLimiter,
  validateLogin,
  validationMiddleware,
  sendOTP,
  testCookie,
);
router.post('/verify-otp', verifyOTP);
router.get('/me', protect, getMe);
router.get('/test-cookie', testCookie);

module.exports = router;
