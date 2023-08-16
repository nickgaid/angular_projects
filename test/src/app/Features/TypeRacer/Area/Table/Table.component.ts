import { NgFor,NgIf } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TypeRacerService } from '../../Services/TypeRacer.service';
import { Word } from '../../Models/Word.model';
import { WordState } from '../../Models/WordState.enum';
import { Subscription } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-Table',
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, NgFor, NgIf],
})

export class TableComponent implements OnInit {

  tableData = {
    title: "This is my copy of TypeRacer",
    data: "You can see here, the Death Star orbiting the forest moon of Endor. Although the weapon systems on this Death Star or not yet operational, the Death Star does have a strong defense mechanism. It is protected by an energy shield which is generated from the nearby forest moon of Endor."
  }
  wordArray: Word[] = [];

  message: Word | undefined;
  subscription: Subscription = new Subscription();

  constructor(private typeRacerData: TypeRacerService) { }

  ngOnInit() {
    this.subscription.add(this.typeRacerData.currentMessage$.subscribe(message => this.message = message));
    this.subscription.add(this.typeRacerData.nextMoveSubject$.subscribe(() => this.NextWordAction()));
    this.subscription.add(this.typeRacerData.previousMoveSubject$.subscribe(message => this.PreviousWordAction(message)));
    this.subscription.add(this.typeRacerData.resetWordSubject$.subscribe(() => this.ResetWordAction()));
    this.wordArray = this.articleToStringTable(this.tableData.data);
    this.NextWordAction();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  articleToStringTable(article: string): Word[] {
    // Split the article into words and symbols (using spaces and various symbols as separators)
    const wordsAndSymbols = article.split(/\s+|\n/);

    // Filter out any empty strings from the result
    const filteredWordsAndSymbols : Word[] = wordsAndSymbols
      //.filter(item => item !== '')
      .map(word =>
        (
          {
            word,
            state: WordState.NONE,
            visited: false
          }
        )
      );

    return filteredWordsAndSymbols;
  }

  NextWordAction()
  {
    let nextWord = this.getNextWord();
    if(nextWord)
    {
      this.typeRacerData.ChangeMessage(nextWord);
    }
  }

  PreviousWordAction(currentWord: Word)
  {
    let previousWord = this.getPreviousWord(currentWord);
    this.typeRacerData.ChangeMessage(previousWord);
  }
  ResetWordAction()
  {
    this.resetWords();
    this.NextWordAction();
  }


  private getNextWord(): Word | undefined
  {
    let nextWord = this.wordArray.find(data => data.visited === false)

    if(nextWord)
    {
      nextWord.state = WordState.HIGHLIGHTED
      nextWord.visited = true;
    }
    return nextWord;
  }

  private getPreviousWord(currentWord : Word): Word
  {
    let wordIndex = this.wordArray.indexOf(currentWord);
    if(wordIndex > 0)
    {

      let previousWord = this.wordArray[wordIndex - 1];
      if(previousWord.state === WordState.CORRECT)
      {
        return currentWord;
      }
      currentWord.state = WordState.NONE;
      currentWord.visited = false;
      return previousWord;
    }

    return currentWord;
  }

  private resetWords()
  {
    this.wordArray.forEach(x => x.visited = false);
    this.wordArray.forEach(x => x.state = WordState.NONE)
  }
}
