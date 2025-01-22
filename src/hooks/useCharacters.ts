import { useMemo, useRef, useState } from "react";
import { searchCharacters } from "../services/Characters";
import { ICharacter } from "../components/ICharacter";

export function useCharacters({ search }: { search: string }) {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const previousSearch = useRef(search);

  const getCharacters = useMemo(() => {
    return async ({search}: {search:string}) => {
      if (search === previousSearch.current) return;
      try {
        setLoading(true);
        setError(null);
        previousSearch.current = search;
        const newCharacters = await searchCharacters({ search });
        setCharacters(newCharacters);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          console.error(error);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
  }, []);

  return { characters, getCharacters, loading };
}
