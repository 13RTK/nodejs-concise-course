import express from 'express';
import cors from 'cors';
import router from './routes/todoRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/v1', router);

export default app;
