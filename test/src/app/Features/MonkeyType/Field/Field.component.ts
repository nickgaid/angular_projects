import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TextAreaComponent } from './TextArea/TextArea.component';
@Component({
  standalone: true,
  selector: 'app-Field',
  templateUrl: './Field.component.html',
  styleUrls: ['./Field.component.css'],
  imports: [TextAreaComponent]
})
export class FieldComponent implements OnInit {

  //message: Word | undefined;
  subscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit() {
    //this.subscription.add(this.typeRacerData.currentMessage$.subscribe(message => this.message = message));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  receiveFirstWord()
  {
  }

}
