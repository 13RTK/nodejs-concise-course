import express from 'express';
import urlRecordRouter from './routes/urlRecordRoute.js';
import cors from 'cors';

const app = express();

// TODO: Auth

app.use(express.json());
app.use(cors());

// TODO: Rate limiter
// TODO: Logging

app.use('/v1', urlRecordRouter);

// TODO: Global error handler

export default app;
