import './App.css';
import { Characters } from './components/Characters';
import responseCharacters from './mocks/resultsCharacters.json'
//import { ICharacter, useFetch } from './services/useFetch';

export function useCharacters() {
  const characters = responseCharacters.results;
  const mappedCharacters = characters.map(character => ({
    id: character.id,
    name: character.name,
    gender: character.gender,
    image: character.image
  }))
  return { characters: mappedCharacters }
}

function App() {
  /* const { data, loading, error } = useFetch('https://rickandmortyapi.com/api/character'); */
  const {characters: mappedCharacters} = useCharacters();
  return (
    <div className='page'>

      <header>
        <h1>Characters Rick and Morty</h1>
        <form className='form'>
          <input type="text" placeholder='Rick Sanchez, Morty Smith, Beth Smith' />
          <button type='submit'>Search</button>
        </form>
      </header>

      <main>
        {
          <Characters characters={mappedCharacters} />
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
