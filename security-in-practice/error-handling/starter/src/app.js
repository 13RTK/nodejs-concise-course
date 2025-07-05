import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

import todoRouter from './routes/todoRoute.js';
import { pinoHttpMiddleware } from './utils/loggerHelper.js';

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  limit: 10,
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use(pinoHttpMiddleware);

app.use((_req, _res, next) => {
  console.log('Request Time: ', new Date());

  next();
});

app.use('/v1', todoRouter);

export default app;
