import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "characterSheet",
    loadComponent: () =>
      import("./CharacterSheet/characterSheet.component").then((c) => c.CharacterSheetComponent),

  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DungeonsAndDragonsRoutingModule { }
