import { useEffect, useState, useCallback } from "react";
import { product } from "../types/product";
import { getProducts } from "../api/products";

export function useProducts() {
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res);
      setError(null);
    } catch (e: any) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { products, loading, error, refetch: fetch };
}
