import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-characterSheet',
  templateUrl: './characterSheet.component.html',
  styleUrls: ['./characterSheet.component.css'],
  imports: [MatInputModule, FormsModule, MatIconModule]
})
export class CharacterSheetComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
