import express from 'express';
import cors from 'cors';

import { readFile } from 'node:fs/promises';

const app = express();
app.use(cors());

const port = 3000;

app.get('/todos', async (_req, res) => {
  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  return res.status(200).json(todos);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
