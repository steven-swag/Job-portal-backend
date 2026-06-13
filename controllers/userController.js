const User = require('../models/User');

const getProfile = async (req, res) => {
  console.log(req.body);
  try {
    const Users = await User.findById(req.user.userId);

    res.status(201).json({
      success: true,
      Users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { skills, education, experience } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        skills,
        education,
        experience,
      },
      { returnDocument: 'after', runValidators: true },
    );
    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadResume = async (req, res) => {
  try {
    const updatedUser = await User.findById(req.user.userId);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    updatedUser.resume = req.file.path;

    await updatedUser.save();

    res.status(200).json({
      success: true,
      resume: updatedUser.resume,
      message: 'Resume Uploaded Successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
};
