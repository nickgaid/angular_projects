import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import { TypeRacerService } from '../../Services/TypeRacer.service';
import { MatIconModule } from '@angular/material/icon';
import { Word } from '../../Models/Word.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { WordState } from '../../Models/WordState.enum';

@Component({
  standalone: true,
  selector: 'app-Input',
  templateUrl: './Input.component.html',
  styleUrls: ['./Input.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],

})

export class InputComponent {

  targetWord!: Word;
  // message$ = BehaviorSubject<string>()
  reloadIcon: string = "autorenew";
  subscription: Subscription = new Subscription();
  formControl: UntypedFormControl = new UntypedFormControl("");
  constructor(private typeRacerData: TypeRacerService) { }

  ngOnInit() {
    this.subscription.add(this.typeRacerData.currentMessage$.subscribe(message => this.targetWord = message));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  validateWord(key : string, value : string, event: string)
  {
    if(value === " ")
    {
      this.formControl.reset();
      return;
    }
    value = value.trim();
    if(key === " " && value === this.targetWord.word)
    {
      this.formControl.reset();
      this.targetWord.state = WordState.CORRECT;
      this.targetWord.visited = true;
      this.typeRacerData.NextMove();
      return;
    }
    else if(key === " " && value !== this.targetWord.word)
    {
      this.formControl.reset();
      this.targetWord.state = WordState.FALSE;
      this.targetWord.visited = true;
      this.typeRacerData.NextMove();
      return;
    }

    if(key ==="Backspace" && value === "")
    {

      this.typeRacerData.PreviousMove(this.targetWord);
      this.targetWord.state = WordState.HIGHLIGHTED;
      this.targetWord.visited = false;
      return;
    }
    if(this.targetWord.word.startsWith(value))
    {
      this.targetWord.state = WordState.HIGHLIGHTED;
    }
    else
    {
      this.targetWord.state = WordState.FALSE;
    }
  }

  resetWords()
  {
    this.typeRacerData.ResetMove();
  }
}
