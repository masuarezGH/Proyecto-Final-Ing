import { useEffect, useState, useCallback } from "react";
import { product } from "../types/product";
import { getProduct } from "../api/products";

export function useProduct(id: number | undefined) {
  const [product, setProduct] = useState<product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (id === undefined) return;
    setLoading(true);
    try {
      const res = await getProduct(id);
      setProduct(res);
      setError(null);
    } catch (e: any) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { product, loading, error, refetch: fetch };
}
