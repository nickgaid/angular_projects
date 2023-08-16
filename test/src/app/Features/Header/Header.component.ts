import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})



export class HeaderComponent implements OnInit {
  @Output() toggleMainSidebar: EventEmitter<any> = new EventEmitter();
  @Input("tog") checked!: boolean;
  constructor() { }

  ngOnInit() {
  }
  toggleSideBar() {
    this.toggleMainSidebar.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }
}
