import { product } from "../types/product";

// Archivo con wrappers para las llamadas a la API externa (fakestoreapi).
// Cada función abstrae un endpoint REST y devuelve la respuesta parseada.
const BASE_URL = "https://fakestoreapi.com/products";

// Devuelve la lista completa de productos.
export async function getProducts(): Promise<product[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`Error fetching products: ${res.status} ${res.statusText}`);
  return res.json();
}

// Devuelve un producto por su id.
export async function getProduct(id: number): Promise<product> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error(`Product ${id} not found: ${res.status}`);
  return res.json();
}

// Agrega un producto. Recibe un objeto sin `id` y devuelve el producto agregado con su id.
export async function addProduct(product: Omit<product, "id">): Promise<product> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error(`Error creating product: ${res.status} ${res.statusText}`);
  return res.json();
}

// Actualiza un producto existente; devuelve el recurso actualizado.
export async function updateProduct(id: number, product: Partial<product>): Promise<product> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error(`Error updating product ${id}: ${res.status} ${res.statusText}`);
  return res.json();
}

// Elimina un producto por id. Lanza error si la respuesta no es OK.
export async function deleteProduct(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    // Lanzamos un error para que la UI pueda mostrar un mensaje apropiado.
    throw new Error("Error al eliminar producto");
  }
  return res.json();
}