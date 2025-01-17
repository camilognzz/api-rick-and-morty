import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Characters } from './components/Characters';
import { useCharacters } from './hooks/useCharacters';
//import { ICharacter, useFetch } from './services/useFetch';

function useSearch() {
  const [search, updateSearch] = useState<string>('');
  const [error, setError] = useState<null | string>(null);
  const isFirstInput = useRef<boolean>(true);

  useEffect(() => {
    if(isFirstInput.current){
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
  /* const { data, loading, error } = useFetch('https://rickandmortyapi.com/api/character'); */
  const { characters } = useCharacters();
  const  { search, updateSearch, error } = useSearch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ search });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(event.target.value)
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
        {
          <Characters characters={characters} />
        }
      </main>
    </div >
  )
}
{/*   <ul>
    {error && <p>Error: {error}</p>}
    {loading && <p>Loading...</p>}
    {data?.map((character: ICharacter) => (<li key={character.id}>
      <div className='list'>
        <h3>{character.name}</h3>
        <img src={character.image} alt={character.name} />
        <p>Gender: {character.gender}</p>
        <p>Species: {character.species}</p>
      </div>
    </li>))}
  </ul> */}

export default App
