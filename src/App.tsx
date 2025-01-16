import './App.css'
import { ICharacter, useFetch } from './services/useFetch'


function App() {

  const { data, loading, error } = useFetch('https://rickandmortyapi.com/api/character');
  return (
    <div>
      <h1>Rick and Morty</h1>
      <div>
        <ul>
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
        </ul>
      </div>
    </div>
  )
}

export default App
