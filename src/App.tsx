import { useEffect, useState } from 'react'
import './App.css'


interface ICharacter {
  id: number;
  name: string;
  species: string;
  img: string;
}

function App() {
  const [data, setData] = useState<null | ICharacter[]>([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(resp => resp.json())
      .then(data => setData(data.results));
  }, [])

  return (
    <div>
      <h1>Rick and Morty</h1>
      <div>
        <ul>
          {data?.map((character: ICharacter) => (<li key={character.id}>
          {character.name}
        </li>))}
        </ul>
      </div>
    </div>
  )
}

export default App
