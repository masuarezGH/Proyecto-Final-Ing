import { product } from "../types/product";

const BASE_URL = "https://fakestoreapi.com/products";

export async function getProducts(): Promise<product[]> {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function getProduct(id: number): Promise<product> {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function createProduct(product: Omit<product, "id">): Promise<product> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function updateProduct(id: number, product: Partial<product>): Promise<product> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id: number): Promise<{ status: string }> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
}