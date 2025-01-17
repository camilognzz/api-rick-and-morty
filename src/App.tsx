import { useEffect, useState } from 'react';
import './App.css';
import { Characters } from './components/Characters';
import { useCharacters } from './hooks/useCharacters';
//import { ICharacter, useFetch } from './services/useFetch';


function App() {
  /* const { data, loading, error } = useFetch('https://rickandmortyapi.com/api/character'); */
  const { characters } = useCharacters();
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ query });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if(query === ''){
      setError('You cannot search for an empty character.');
      return
    }
    if (query.match(/^\d+$/)) {
      setError('You cannot search for a character with a number.');
      return
    }
    if (query.length < 3) {
      setError('The search must have at least 3 characters.');
      return
    }
    setError(null);
  }, [query])

  return (
    <div className='page'>

      <header>
        <h1>Characters Rick and Morty</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} name='query' type="text" placeholder='Rick Sanchez, Morty Smith, Beth Smith' />
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
