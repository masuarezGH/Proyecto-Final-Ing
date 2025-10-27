import { product } from "../types/product";

// Archivo con wrappers para las llamadas a la API externa (fakestoreapi).
// Cada función abstrae un endpoint REST y devuelve la respuesta parseada.
const BASE_URL = "https://fakestoreapi.com/products";

// Devuelve la lista completa de productos.
export async function getProducts(): Promise<product[]> {
  const res = await fetch(BASE_URL);
  // No hacemos manejo avanzado de errores aquí; el consumidor puede catchear la promesa.
  return res.json();
}

// Devuelve un producto por su id.
export async function getProduct(id: number): Promise<product> {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

// Crea un producto. Recibe un objeto sin `id` y devuelve el producto creado con su id.
export async function createProduct(product: Omit<product, "id">): Promise<product> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

// Actualiza un producto existente; devuelve el recurso actualizado.
export async function updateProduct(id: number, product: Partial<product>): Promise<product> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
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