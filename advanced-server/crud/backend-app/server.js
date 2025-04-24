import express from 'express';
import { readFile } from 'node:fs/promises';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/todos', async (req, res) => {
  const todoData = await readFile('./data.json', 'utf-8');

  return res.status(200).json(JSON.parse(todoData));
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
