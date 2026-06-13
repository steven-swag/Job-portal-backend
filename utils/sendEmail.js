const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  console.log('Creating transporter');

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log('Transporter created');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
  };

  try {
    console.log('Before sendMail');

    const info = await transporter.sendMail(mailOptions);

    console.log('After sendMail');
    console.log('Mail sent:', info.messageId);
  } catch (error) {
    console.error('EMAIL ERROR:', error);
    throw error;
  }
};

module.exports = sendEmail;