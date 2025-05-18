import { Product } from "../types/product";
import { getConfig } from "../utils/configHelper";

const BASE_URL = getConfig("BASE_URL");

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}`);
  const result = await response.json();

  return result;
}

export async function addProduct(product: Product) {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const result = await response.json();

  return result;
}
