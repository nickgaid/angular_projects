import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-characterSheet',
  templateUrl: './characterSheet.component.html',
  styleUrls: ['./characterSheet.component.css'],
  imports: [MatInputModule, FormsModule]
})
export class CharacterSheetComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
