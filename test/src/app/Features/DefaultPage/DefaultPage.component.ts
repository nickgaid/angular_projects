import {Component, OnInit} from '@angular/core';
import { HeaderComponent } from '../Header/Header.component';
import { SideBarComponent } from '../SideBar/SideBar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-DefaultPage',
  templateUrl: './DefaultPage.component.html',
  styleUrls: ['./DefaultPage.component.scss'],
  standalone: true,
  imports: [HeaderComponent, SideBarComponent , MatSidenavModule,RouterModule]
})



export class DefaultPageComponent implements OnInit {
  sideBarOpen = true;
  constructor() { }

  ngOnInit() {
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
