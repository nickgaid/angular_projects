import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "area",
    loadComponent: () =>
      import("./Area/Area.component").then((c) => c.AreaComponent),

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeRacerRoutingModule { }
