import { LetterState } from "./LetterState.enum";

export interface Letter
{
  character: string,
  state: LetterState,
  visited: boolean
}
