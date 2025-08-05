import express from 'express';
import urlRecordRouter from './routes/urlRecordRoute.js';
import cors from 'cors';
import urlRedirectRouter from './routes/urlRedirectRoute.js';

const app = express();

// TODO: Auth

app.use(express.json());
app.use(cors());

// TODO: Rate limiter
// TODO: Logging

app.use('/v1', urlRecordRouter);
app.use('/v1', urlRedirectRouter);

// TODO: Global error handler

export default app;
