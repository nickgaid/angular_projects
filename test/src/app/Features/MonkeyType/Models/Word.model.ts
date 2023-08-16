
import { Letter } from "./Letter.model";
import { WordState } from "./WordState.enum";

export interface Word
{
  text: string,
  state: WordState,
  visited: boolean,
  letters: Letter[]
}
