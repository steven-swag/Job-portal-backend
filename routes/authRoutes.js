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

router.get('/test-email', async (req, res) => {
  try {
    await sendEmail(
      'yourpersonalemail@gmail.com',
      'Test Email',
      'Brevo is working successfully!',
    );

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
