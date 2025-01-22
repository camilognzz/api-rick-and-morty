import { ICharacter } from "../components/ICharacter";

export const searchCharacters = async ({search} :{ search: string }) => {
    if(search === '') return null
    try{
        const response = await fetch(`https://rickandmortyapi.com/api/character?name=${encodeURIComponent(search)}`);
        const json = await response.json();
        const characters = json.results;
        return characters.map((character: ICharacter) => ({
            id: character.id,
            name: character.name,
            gender: character.gender,
            image: character.image
          }))
    }catch{
        throw new Error('Error searching characters');
    }
}