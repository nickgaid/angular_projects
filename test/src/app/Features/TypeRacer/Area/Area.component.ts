import { Component, OnInit } from '@angular/core';
import { InputComponent } from './Input/Input.component';
import { TableComponent } from './Table/Table.component';
import { TypeRacerService } from '../Services/TypeRacer.service';
import { Word } from '../Models/Word.model';
import { Subscription } from 'rxjs';
@Component({
  standalone: true,
  selector: 'app-Area',
  templateUrl: './Area.component.html',
  styleUrls: ['./Area.component.css'],
  imports: [InputComponent, TableComponent]
})
export class AreaComponent implements OnInit {

  message: Word | undefined;
  subscription: Subscription = new Subscription();

  constructor(private typeRacerData: TypeRacerService) { }

  ngOnInit() {
    this.subscription.add(this.typeRacerData.currentMessage$.subscribe(message => this.message = message));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  receiveFirstWord()
  {
  }

}
