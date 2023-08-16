import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeRacerComponent } from './TypeRacer.component';
import { TypeRacerRoutingModule } from './TypeRacer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TypeRacerRoutingModule
  ],
  declarations: [TypeRacerComponent]
})
export class TypeRacerModule { }
