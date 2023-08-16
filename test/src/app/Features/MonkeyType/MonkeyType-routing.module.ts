import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "field",
    loadComponent: () =>
      import("./Field/Field.component").then((c) => c.FieldComponent),

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonkeyTypeRoutingModule { }
