import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (_request, response) => {
  return response.status(200).json({
    message: 'Hello World',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
