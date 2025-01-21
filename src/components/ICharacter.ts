export interface ICharacter {
  id: number;
  name: string;
  gender: string;
  image: string;
}

export interface CharactersProps {
  characters: ICharacter[];

}
export interface CharactersResponse {
  results: ICharacter[];
}
