import rateLimiter from './utils/rateLimiter.js';
import express from 'express';
import cors from 'cors';
import { pinoHttpMiddleware } from './utils/loggerHelper.js';

import urlRedirectRouter from './routes/urlRedirectRoute.js';
import urlRecordRouter from './routes/urlRecordRoute.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with {type: 'json'};

const app = express();

// TODO: Auth

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(rateLimiter);
app.use(pinoHttpMiddleware)

app.use('/v1', urlRecordRouter);
app.use('/v1', urlRedirectRouter);


// TODO: Global error handler

export default app;
