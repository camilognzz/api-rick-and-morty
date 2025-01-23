import { ICharacter } from "../components/ICharacter";

export const searchCharacters = async ({ search }: { search: string }) => {
    try {
        const url = search 
            ? `https://rickandmortyapi.com/api/character?name=${encodeURIComponent(search)}`
            : `https://rickandmortyapi.com/api/character`;
        const response = await fetch(url);
        const json = await response.json();

        if (!json.results) return [];
        return json.results.map((character: ICharacter) => ({
            id: character.id,
            name: character.name,
            gender: character.gender,
            species: character.species,
            image: character.image,
        }));
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching characters');
    }
};
