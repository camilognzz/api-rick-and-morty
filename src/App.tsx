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
    <div className='page'>

      <header>
        <h1>Characters Rick and Morty</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' type="text" placeholder='Rick Sanchez, Morty Smith, Beth Smith' />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <h1 className="text-center text-gray-900 bg-slate-500">
          Hello world!
        </h1>
        {
          loading ? <p>Loading...</p> : <Characters characters={characters} />
        }
      </main>
      <footer>Powered by Camilognzz</footer>
    </div >
  )
}

export default App
