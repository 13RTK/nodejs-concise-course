import { rateLimit } from 'express-rate-limit';

const rateLimiter = rateLimit({
  // 1 minute
  windowMs: 60 * 1000,
  // Limit each IP to 15 requests per `window` (here, per 1 minutes).
  limit: 15,
  // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  standardHeaders: 'draft-8',
});

export default rateLimiter;
