const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Job',
    },

    status: {
      type: String,
      enum: ['pending', 'rejected', 'accepted'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Application', applicationSchema);
