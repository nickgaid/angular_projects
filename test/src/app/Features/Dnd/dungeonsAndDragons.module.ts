import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DungeonsAndDragonsRoutingModule } from './dungeonsAndDragons-routing.module';
import { DungeonsAndDragonsComponent } from './dungeonsAndDragons.component';

@NgModule({
  imports: [
    CommonModule,
    DungeonsAndDragonsRoutingModule
  ],
  declarations: [DungeonsAndDragonsComponent]
})
export class DungeonsAndDragonsModule { }
