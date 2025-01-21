import { useState } from 'react';
import withoutResults from '../mocks/noResultsCharacters.json';
import { CharactersResponse } from '../components/ICharacter';

export function useCharacters({search} :{ search: string }) {
  const [responseCharacters, setResponseCharacters] = useState<CharactersResponse>({ results: [] });
    const characters = responseCharacters.results;

    const mappedCharacters = characters.map(character => ({
      id: character.id,
      name: character.name,
      gender: character.gender,
      image: character.image
    }))

    const getCharacters = () => {
      if(search){
        //setResponseCharacters(withResults);
        fetch(`https://rickandmortyapi.com/api/character?name=${encodeURIComponent(search)}`)
        .then(response => response.json())
        .then(json => {
          setResponseCharacters(json)
        })
      }else{
        setResponseCharacters(withoutResults);
      }
    }

    return { characters: mappedCharacters, getCharacters }
  }