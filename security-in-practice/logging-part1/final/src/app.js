import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';

import todoRouter from './routes/todoRoute.js';

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
app.use(morgan('tiny'));

app.use('/v1', todoRouter);

export default app;
