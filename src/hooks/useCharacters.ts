import responseCharacters from '../mocks/resultsCharacters.json'

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