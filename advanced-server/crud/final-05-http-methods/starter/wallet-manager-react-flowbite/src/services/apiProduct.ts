import { Product } from "../types/product";
import { getConfig } from "../utils/configHelper";

const BASE_URL = getConfig("BASE_URL");

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}`);
  const result = await response.json();

  return result;
}

export async function addProduct(product: Product) {
  console.log(JSON.stringify(product));

  const response = await fetch(`${BASE_URL}/add/${JSON.stringify(product)}`);
  const result = await response.json();

  return result;
}
