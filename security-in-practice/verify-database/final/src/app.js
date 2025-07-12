import express from 'express';
import cors from 'cors';

import todoRouter from './routes/todoRoute.js';
import { pinoHttpMiddleware } from './utils/loggerHelper.js';
import rateLimiter from './utils/rateLimiter.js';
import globalErrorhandler from './utils/globalErrorhandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// app.use(pinoHttpMiddleware);

app.use('/v1', todoRouter);

// global error handler
app.use(globalErrorhandler);

export default app;
