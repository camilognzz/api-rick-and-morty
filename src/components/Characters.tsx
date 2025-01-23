import { CharactersProps } from "./ICharacter"

export const RenderCharacters = ({ characters }: CharactersProps) => {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {characters.map((character) => (
                <li
                    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
                    key={character.id}
                >
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4 text-center">
                        <h3 className="text-lg font-bold text-green-400">{character.name}</h3>
                        <p className="text-gray-400">Gender: {character.gender}</p>
                        <p className="text-gray-400">Species: {character.species}</p>
                    </div>
                </li>
            ))}
        </ul>

    )
}

export const NoCharactersResults = () => {
    return (
        <p className="text-center">No results found for this character.</p>
    )
}

export const Characters = ({ characters }: CharactersProps) => {
    const hasCharacters = characters?.length > 0;

    return (
        hasCharacters
            ? <RenderCharacters characters={characters} />
            : <NoCharactersResults />
    )
}