const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getjobs = async (req, res) => {
  try {
    const { keyword = '', location, company } = req.query;

    const query = {};

    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    if (keyword) {
      {
        query.title = { $regex: keyword, $options: 'i' };
      }
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }
    const jobs = await Job.find(query)
      .populate('createdBy', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate('createdBy', 'name email');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user.userId,
    });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getjobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
};
