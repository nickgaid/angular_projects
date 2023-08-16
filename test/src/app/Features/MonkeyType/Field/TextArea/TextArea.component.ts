import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Letter } from '../../Models/Letter.model';
import { LetterState } from '../../Models/LetterState.enum';
import { MatIconModule } from '@angular/material/icon';
import { Word } from '../../Models/Word.model';
import { WordState } from '../../Models/WordState.enum';

@Component({
  standalone: true,
  selector: 'app-Table',
  templateUrl: './TextArea.component.html',
  styleUrls: ['./TextArea.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule, ReactiveFormsModule, MatIconModule],
})

export class TextAreaComponent implements OnInit {
  showOverlay: boolean = true;
  inputHasFocus: boolean = false;
  reloadIcon: string = "autorenew";
  skipKeyList = ['Escape','Enter','Control','AltGraph','Shift','CapsLock','Alt','Tab'];
  inputVisible = false; // Initially, input field is hidden
  formControl: UntypedFormControl = new UntypedFormControl("");
  tableData =
  {
    title: "This is my copy of MonkeyType",
    data: "You can see here , the Death Star orbiting the forest moon of Endor. Although the weapon systems on this Death Star or not yet operational, the Death Star does have a strong defense mechanism. It is protected by an energy shield which is generated from the nearby forest moon of Endor. "
  };
    /* */
  wordArray: Word[] = [];
  currentWord!: Word;
  currentLetter: Letter;
  subscription: Subscription = new Subscription();
  remainingTime: number = 60; // 1 minute in seconds
  timerInterval: any;
  startTime: number = 0;
  endTime: number = 0;
  calculatedWPM: number = 0;

  constructor() { }

  ngOnInit() {
    this.wordArray = this.articleToLetterTable(this.tableData.data);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  @HostListener('document:keydown.control.backspace', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void
    {
    this.currentWord.letters.forEach(letter =>
      {
        letter.state = LetterState.NONE,
        letter.visited = false
      }
    )

    this.currentLetter = this.currentWord.letters[0];

    this.currentLetter.state = LetterState.HIGHLIGHTED;
    this.currentLetter.visited = true;
  }

  @ViewChild('myInputField', { static:true}) myInputField!: ElementRef;
  handleReFocusInput(): void
  {
    const myInputFieldElement = this.myInputField.nativeElement;
    myInputFieldElement.focus();
    myInputFieldElement.innerHTML = 'Updated content';
  }
  onElementFocus(): void
  {
    this.hideOverlay();
    this.GetNextWord();
    this.startTimer(); // Start the countdown timer
  }
  articleToLetterTable(article: string): Word[]
  {
    const result : Word[] = article.split(/\s+|\n/).map(word =>
      ({
        text: word,
        state: WordState.NONE,
        visited: false,
        letters: word.split('').map(letter =>
          ({
            character: letter,
            state: LetterState.NONE,
            visited: false
          }))
      }));

      return result;
  }


  validateLetter(letter: string)
  {
    if(letter === "" || this.skipKeyList.includes(letter))
    {
      return;
    }
    if(letter === "Backspace")
    {
      this.GetPreviousLetter();
      this.VisitedWords();
      return;
    }
    if(letter === " ")
    {
      if(this.currentWord.letters.every(letter => letter.visited === false))
      {
        return;
      }
      if(this.currentWord.letters.find(letter => letter.state === LetterState.FALSE || letter.state === LetterState.HIGHLIGHTED))
      {
        this.currentLetter.state = LetterState.NONE;
        this.currentWord.state = WordState.FALSE;
      }
      else
      {
        this.currentWord.state = WordState.CORRECT;
      }

      this.GetNextWord();
      this.VisitedWords()
      return;
    }
    this.currentLetter.visited = true;
    if(letter === this.currentLetter.character)
    {
      this.currentLetter.state = LetterState.CORRECT;
      this.GetNextLetter();
    }

    else
    {
      this.currentLetter.state = LetterState.FALSE;
      this.GetNextLetter();
      //this.NextLetterAction();
    }

    this.VisitedWords();
  }
  GetNextWord()
  {
    let nextWord = this.wordArray.find(word => word.visited === false)!;
    if(nextWord)
    {
      this.currentWord = nextWord;
      this.currentWord.visited = true;
      if(this.currentLetter)
      {
        this.currentLetter.visited = true;
      }
      this.currentLetter = this.currentWord.letters[0];
      this.currentLetter.state = LetterState.HIGHLIGHTED;
    }
    else{
      this.endTime = new Date().getTime();
      this.calculateWpm();
    }
    return this.currentWord;
  }

  GetNextLetter()
  {
    let nextLetter = this.currentWord.letters.find(letter => letter.visited === false);

    if(!nextLetter) { return; }

    this.currentLetter.visited = true;
    this.currentLetter = nextLetter;
    this.currentLetter.state = LetterState.HIGHLIGHTED;
  }

  GetPreviousWord()
  {
    let currentWordIndex = this.wordArray.indexOf(this.currentWord);
    if(currentWordIndex < 1)
    {
      return;
    }
    let previousWord = this.wordArray[currentWordIndex - 1];
    if(previousWord.state === WordState.CORRECT)
    {
      return;
    }
    this.currentWord.state = WordState.NONE;
    this.currentWord.visited = false;

    this.currentLetter.state = LetterState.NONE;
    this.currentLetter.visited = false;

    this.currentWord = previousWord;
    this.currentLetter = this.currentWord.letters.slice(-1)[0];
    this.currentLetter.state = LetterState.HIGHLIGHTED;
  }

  GetPreviousLetter()
  {
    let letterIndex = this.currentWord.letters.indexOf(this.currentLetter);

    if(letterIndex < 1)
    {
      this.GetPreviousWord();
      return;
    }

    let previousLetter = this.currentWord.letters[letterIndex - 1];

    this.currentLetter.state = LetterState.NONE;
    this.currentLetter.visited = false;
    this.currentLetter = previousLetter;
    this.currentLetter.state = LetterState.HIGHLIGHTED;
    this.currentLetter.visited = true;
  }
  Reload()
  {
    console.log(this.wordArray);
    this.ClearWords();
    this.ClearTimers();

    console.log(this.wordArray);

    this.handleReFocusInput();
  }
  ClearWords()
  {
    this.currentLetter = null;
    this.wordArray.forEach(word =>
      {
        word.state = WordState.NONE,
        word.visited = false,
        word.letters.forEach(letter =>
          {
            letter.state = LetterState.NONE,
            letter.visited = false
          }
        )
      }
    )
  }
  ClearTimers()
  {
    this.remainingTime = 60;
    this.endTime = 0;
    this.calculatedWPM = 0;
    this.startTime = 0;
  }
  VisitedWords()
  {
    let visitedWords = this.wordArray.filter(x => x.visited).length;

    return visitedWords + '/' + this.wordArray.length;
  }

  startTimer() {
    this.startTime = new Date().getTime();
    this.timerInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const elapsedTimeInSeconds = (currentTime - this.startTime) / 1000;
    this.remainingTime = Math.max(0, 60 - Math.floor(elapsedTimeInSeconds));

    if (this.remainingTime <= 0) {
      clearInterval(this.timerInterval);
      this.calculateWpm(); // Calculate the WPM when the timer reaches 0
    }
  }, 1000);  // Update every second
  }
  calculateWpm(){
    const elapsedTimeInSeconds = (this.endTime - this.startTime) / 1000;
    this.calculatedWPM = Math.round((this.wordArray.length / elapsedTimeInSeconds) * 60);
  }
  hideOverlay() {
    this.showOverlay = false;
    this.inputHasFocus = true;
    this.handleReFocusInput();
  }
  onElementBlur() {
    this.inputHasFocus = false;
    this.showOverlay = true;
    this.ClearWords();
    this.ClearTimers();
    // Your code to execute when the element loses focus
  }
}
