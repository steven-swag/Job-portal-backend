const ratelimit = require('express-rate-limit');

const rateLimiter = ratelimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,// limit each IP to 5 requests per windowMs

  message: {
    success: false,
    message:
      'Too many requests from this IP, please try again after 15 minutes',
  },
});

module.exports = rateLimiter;
