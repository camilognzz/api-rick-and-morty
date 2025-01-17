import { CharactersProps } from "./ICharacter"

export const RenderCharacters = ({ characters }: CharactersProps) => {
    return (
        <ul>
            {
                characters.map(character => (
                    <li key={character.id}>
                        <h3>{character.name}</h3>
                        <p>{character.gender}</p>
                        <img src={character.image} alt={character.name} />
                    </li>
                ))
            }
        </ul>
    )
}

export const NoCharactersResults = () => {
    return (
        <p>No se encontraron resultados</p>
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