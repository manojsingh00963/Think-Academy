import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, //  window milliseconds (1 hour)
  max: 100,
  message: "You add Too many requests, please try again later",
});

export default limiter;
