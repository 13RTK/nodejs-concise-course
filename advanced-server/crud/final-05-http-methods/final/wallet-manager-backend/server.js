import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'node:fs/promises';

const server = express();
const port = 3000;

server.use(cors());

server.get('/products', async (_req, res) => {
  const productsData = await readFile('./data.json', 'utf-8');
  const products = JSON.parse(productsData);

  return res.status(200).json(products);
});

server.get('/products/add/:addProduct', async (req, res) => {
  const productsData = await readFile('./data.json', 'utf-8');
  const products = JSON.parse(productsData);

  const addProduct = req.params.addProduct;
  const parsedAddProduct = JSON.parse(addProduct);

  console.log(addProduct);

  const updatedProducts = [...products, parsedAddProduct];

  await writeFile('./data.json', JSON.stringify(updatedProducts), 'utf-8');

  return res.status(200).json({
    message: 'Product added successfully',
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
