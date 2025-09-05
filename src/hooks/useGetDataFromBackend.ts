import axios, { type AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

interface UseApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
}

interface UseApiRequestReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  callback: (url: string, options?: UseApiRequestOptions) => Promise<void>;
}

export function useGetDataFromBackend<T>({
  url,
  options,
  executeAutomatically = false,
}: {
  url: string;
  options: UseApiRequestOptions;
  executeAutomatically?: boolean;
}): UseApiRequestReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callback = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        method: options.method || "GET",
        url,
        data: options.body,
        headers: options.headers,
      };
      const response: AxiosResponse<T> = await axios(config);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (executeAutomatically) {
      callback();
    }
  }, [executeAutomatically]);

  return { data, loading, error, callback };
}
