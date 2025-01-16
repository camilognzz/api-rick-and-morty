import { useEffect, useState } from "react";

export interface ICharacter {
  id: number;
  name: string;
  gender: string;
  species: string; 
  image: string;
}

export function useFetch(url: string) {
  const [data, setData] = useState<null | ICharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setData(data.results))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, []);

  return { data, loading, error };
}
