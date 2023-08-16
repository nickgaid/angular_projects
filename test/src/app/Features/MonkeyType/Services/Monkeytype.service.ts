import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs';
import { LetterState } from '../Models/LetterState.enum';
import { Word } from '../Models/Word.model';
import { WordState } from '../Models/WordState.enum';
@Injectable({
  providedIn: 'root'
})
export class MonkeyTypeService
{
  private messageSource$ = new BehaviorSubject<Word>
  (
    {
      text: "",
      state: WordState.NONE,
      visited: true,
      letters:
      [
        {
          character: 'T',
          state: LetterState.NONE,
          visited: true
        }
      ]
    }
  );
  nextMoveSubject$ = new Subject<void>();
  previousMoveSubject$ = new Subject<Word>();

  currentMessage$ = this.messageSource$.asObservable();

  constructor() { }

  ChangeMessage(word: Word)
  {
    this.messageSource$.next(word);
  }

  NextMove()
  {
    this.nextMoveSubject$.next();
  }

  PreviousMove(word: Word)
  {
    this.previousMoveSubject$.next(word);
  }
}
