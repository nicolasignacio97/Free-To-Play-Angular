import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [

  {
    path: 'personajes',
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule)
  },

  {
    path: '**',
    redirectTo: 'personajes/listado'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
