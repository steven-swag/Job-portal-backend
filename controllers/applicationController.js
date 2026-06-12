const Application = require('../models/Application');
const sendEmail = require('../utils/sendEmail');
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const existingApplication = await Application.findOne({
      applicant: req.user.userId,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        error: 'You have already applied for this job.',
      });
    }

    const application = await Application.create({
      applicant: req.user.userId,
      job: jobId,
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getApplicationsForJob = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.userId,
    }).populate('job', 'company name title salary location');

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'name email resume')
      .populate('job', 'company title');

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId)
      .populate('applicant', 'name email')
      .populate('job', 'company title');

    if (!application) {
      {
        return res.status(404).json({
          success: false,
          message: 'Application not found',
        });
      }
    }

    application.status = status;
    await application.save();

    if (status === 'accepted') {
      {
        // Send email to applicant
        await sendEmail(
          application.applicant.email,
          'Application Status Update - Selected for Next Stage',
          `Dear ${application.applicant.name},

We are pleased to inform you that your application for the position of ${application.job.title} at ${application.job.company} has been successfully reviewed and shortlisted for the next stage of our recruitment process.

Your qualifications, skills, and experience have impressed our hiring team, and we believe you could be a valuable addition to our organization.

What happens next?
• Our recruitment team may contact you shortly regarding the next steps.
• You may be invited for a technical assessment, interview, or further evaluation.
• Please keep an eye on your email and phone for future communication.

We appreciate the time and effort you invested in your application and thank you for your interest in joining ${application.job.company}.

Congratulations on progressing to the next stage. We wish you the very best and look forward to speaking with you soon.

Best Regards,

Recruitment Team
${application.job.company}

Job Tracker Platform`,
        );
      }
    }
    if (status === 'rejected') {
      await sendEmail(
        application.applicant.email,
        'Application Status Update',
        `Dear ${application.applicant.name},

Thank you for your interest in the position of ${application.job.title} at ${application.job.company} and for taking the time to submit your application.

After careful consideration of your profile and application, we regret to inform you that you have not been selected for the next stage of the recruitment process for this particular opportunity.

Please understand that this decision was not easy, as we received applications from many qualified candidates. While your qualifications are appreciated, we have chosen to move forward with candidates whose experience and skills more closely match the current requirements of the role.

We encourage you to continue exploring future opportunities with ${application.job.company} and to apply for positions that align with your skills and career goals.

We sincerely appreciate your interest in our organization and wish you success in your future professional endeavors.

Thank you for considering ${application.job.company} as a potential employer.

Best Regards,

Recruitment Team
${application.job.company}

Job Tracker Platform`,
      );
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  applyForJob,
  getApplicationsForJob,
  getApplicantsForJob,
  updateApplicationStatus,
};
