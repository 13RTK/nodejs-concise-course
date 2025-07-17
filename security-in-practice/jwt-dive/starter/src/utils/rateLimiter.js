import { rateLimit } from 'express-rate-limit';

export default rateLimit({
  windowMs: 1000, // 1 second
  limit: 10,
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
