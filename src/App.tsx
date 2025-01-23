import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Characters } from './components/Characters';
import { useCharacters } from './hooks/useCharacters';
import debounce from 'just-debounce-it';

function useSearch() {
  const [search, updateSearch] = useState<string>('');
  const [error, setError] = useState<null | string>(null);
  const isFirstInput = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return
    }

    if (search === '') {
      setError('You cannot search for an empty character.');
      return
    }
    if (search.match(/^\d+$/)) {
      setError('You cannot search for a character with a number.');
      return
    }
    if (search.length < 3) {
      setError('The search must have at least 3 characters.');
      return
    }
    setError(null);
  }, [search])

  return { search, updateSearch, error };
}

function App() {
  const { search, updateSearch, error } = useSearch();
  const { characters, loading, getCharacters } = useCharacters({ search });

  const debounceGetCharacters = useCallback(
    debounce((search: string) => {
      console.log('search', search);
      getCharacters({ search })
    }, 400)
    , [getCharacters])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getCharacters({ search });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debounceGetCharacters(newSearch);
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Rick and Morty Characters</h1>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            name="query"
            type="text"
            placeholder="Rick Sanchez, Morty Smith, Beth Smith"
            className="w-full sm:w-1/3 p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md transition duration-200"
          >
            Search
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </header>

      <main className="p-6">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <Characters characters={characters} />
        )}
      </main>

      <footer className="text-center py-4">
        <p className="text-sm text-gray-400">
          Powered by{' '}
          <a
            href="https://www.linkedin.com/in/camilognzz1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:underline"
          >
            Camilognzz
          </a>
        </p>
      </footer>
    </div>

  )
}

export default App
