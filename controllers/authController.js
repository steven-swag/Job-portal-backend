const { default: mongoose } = require('mongoose');
const User = require('../models/User');
const generateOTP = require('../utils/generateOTP');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const sendOTP = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Find user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP
    user.otp = otp;

    // Expire after 5 minutes
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    console.log('OTP request received');
    console.log(req.body);

    await user.save();
    console.log('Before sendEmail');

        await sendEmail(
          email,
          'Job Tracker - OTP Verification',
          `Hello,

    Your OTP for Job Tracker is ${otp}.

    This OTP is valid for 5 minutes.

    If you did not request this OTP, please ignore this email.

    Regards,
    Job Tracker Team`,
        );

    console.log('After sendEmail');
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      });
    }

    if (user.otp !== otp) {
      return res.status(404).json({
        success: false,
        message: 'Invalid otp',
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'OTP Expired',
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

const testCookie = (req, res) => {
  console.log(req.cookies);

  res.json({
    cookies: req.cookies,
  });
};

const testEmail = async (req, res) => {
  try {
    await sendEmail(
      'stevensharon875@gmail.com',
      'Test Email',
      'Brevo is working successfully',
    );

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  sendOTP,
  verifyOTP,
  getMe,
  testCookie,
  testEmail,
};
