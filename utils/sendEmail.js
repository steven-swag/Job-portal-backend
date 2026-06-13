const SibApiV3Sdk = require('sib-api-v3-sdk');

const sendEmail = async (email, subject, text) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  const apiKey =
    defaultClient.authentications['api-key'];

  apiKey.apiKey = process.env.BREVO_API_KEY;

  const apiInstance =
    new SibApiV3Sdk.TransactionalEmailsApi();

  await apiInstance.sendTransacEmail({
    sender: {
      email: 'stevensharon875@gmail.com',
      name: 'Job Tracker',
    },
    to: [{ email }],
    subject,
    textContent: text,
  });
};

module.exports = sendEmail;