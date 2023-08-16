import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonkeyTypeRoutingModule } from './MonkeyType-routing.module';
import { MonkeyTypeComponent } from './MonkeyType.component';

@NgModule({
  imports: [
    CommonModule,
    MonkeyTypeRoutingModule
  ],
  declarations: [MonkeyTypeComponent]
})
export class MonkeyTypeModule { }
