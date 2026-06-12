const user = require('../models/User');
const job = require('../models/Job');
const application = require('../models/Application');

const getDashboardData = async (req, res) => {
  try {
    const totalUsers = await user.countDocuments({
      role: 'user',
    });
    const totalJobs = await job.countDocuments();
    const totalApplications = await application.countDocuments();

    const accpetedApplications = await application.countDocuments({
      status: 'accepted',
    });
    const rejectedApplications = await application.countDocuments({
      status: 'rejected',
    });
    const pendingApplications = await application.countDocuments({
      status: 'pending',
    });

    res.status(200).json({
      success: true,
      status: {
        totalUsers,
        totalJobs,
        totalApplications,
        acceptedApplications: accpetedApplications,
        rejectedApplications: rejectedApplications,
        pendingApplications: pendingApplications,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardData,
};
