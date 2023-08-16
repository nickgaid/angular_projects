import { WordState } from "./WordState.enum";

export interface Word {
  word: string,
  state: WordState,
  visited: boolean
}
