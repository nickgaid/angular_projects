import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./Features/DefaultPage/DefaultPage.component").then((c) => c.DefaultPageComponent),
    children:
    [
      {
        path: "typeracer",
        loadChildren: () => import("./Features/TypeRacer/TypeRacer.module").then((c) => c.TypeRacerModule)
      },
      {
        path: "monkeytype",
        loadChildren: () => import("./Features/MonkeyType/MonkeyType.module").then((c) => c.MonkeyTypeModule)
      },
      {
        path: "dnd",
        loadChildren: () => import("./Features/Dnd/dungeonsAndDragons.module").then((c) => c.DungeonsAndDragonsModule)
      }
    ]
  }
];

@NgModule({
  imports: [

    RouterModule.forRoot(routes, {

      preloadingStrategy: PreloadAllModules,

    }),

  ],

  exports: [RouterModule],
})
export class AppRoutingModule { }
