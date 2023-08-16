import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-SideBar',
  templateUrl: './SideBar.component.html',
  styleUrls: ['./SideBar.component.scss'],
  imports: [MatSidenavModule, CommonModule, MatButtonModule, MatListModule, MatDividerModule, MatExpansionModule, MatIconModule, MatMenuModule, RouterModule],

})
export class SideBarComponent {

  menu = [
    {
      title: "Type Racer",
      icon: "home",
      route: "typeracer/area",
    },
    {
      title: "Monkey Type",
      icon: "keyboard",
      route: "monkeytype/field"
    },
    {
      title: "Dungeons & Dragons",
      image: "dragon.png",
      route: "dnd/characterSheet"
    }
  ];

  constructor() {}

  ngOnInit() {}

}
