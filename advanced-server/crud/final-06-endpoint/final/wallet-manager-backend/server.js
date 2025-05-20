import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'node:fs/promises';

const server = express();
const port = 3000;

server.use(cors());
server.use(express.json());

server.get('/products', async (_req, res) => {
  const productsData = await readFile('./data.json', 'utf-8');
  const products = JSON.parse(productsData);

  return res.status(200).json(products);
});

server.post('/products', async (req, res) => {
  const productsData = await readFile('./data.json', 'utf-8');
  const products = JSON.parse(productsData);

  const addProduct = req.body;
  if (!addProduct) {
    return res.status(400).json({
      message: 'Bad request',
    });
  }

  const updatedProducts = [...products, addProduct];

  await writeFile('./data.json', JSON.stringify(updatedProducts), 'utf-8');

  return res.status(200).json({
    message: 'Product added successfully',
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
