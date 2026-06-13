const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  console.log('Verifying transporter');

  await transporter.verify();

  console.log('Transporter verified');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
  };

  console.log('Before sendMail');

  const info = await transporter.sendMail(mailOptions);

  console.log('Mail sent:', info.messageId);
};

module.exports = sendEmail;
