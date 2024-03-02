import { useEffect, useState } from "react";

type getFetchDataReturn<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

interface RequestConfig {
  url: string;
}

export const GetFetchData = <T>({
  url,
}: RequestConfig): getFetchDataReturn<T> => {
  const baseUrl = "https://rickandmortyapi.com/api";

  const [fetchData, setFetchData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/${url}`);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setLoading(false);
        setFetchData(json);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data: fetchData, loading, error };
};
