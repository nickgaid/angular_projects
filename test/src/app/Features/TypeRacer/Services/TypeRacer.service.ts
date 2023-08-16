import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Word } from '../Models/Word.model';
import { WordState } from '../Models/WordState.enum';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TypeRacerService
{
  private messageSource$ = new BehaviorSubject<Word>(
    {
      word: 'Type here!',
      state: WordState.NONE,
      visited: true
    });
  resetWordSubject$ = new Subject<void>();
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

  ResetMove()
  {
    this.resetWordSubject$.next();
  }
}
