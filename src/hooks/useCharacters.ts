import { useState, useEffect, useCallback } from 'react';
import { searchCharacters } from '../services/Characters';
import { ICharacter } from '../components/ICharacter';

export const useCharacters = ({ search }: { search: string }) => {
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);

    const getCharacters = useCallback(async ({ search }: { search: string }) => {
        try {
            setLoading(true);
            setError(null);
            const results = await searchCharacters({ search });
            setCharacters(results);
        } catch {
            setError('Error fetching characters.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCharacters({ search: '' }); 
    }, [getCharacters]);

    useEffect(() => {
        if (search) {
            getCharacters({ search });
        }
    }, [search, getCharacters]);

    return { characters, loading, error, getCharacters };
};
