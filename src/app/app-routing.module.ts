import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'personajes',
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule)
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: 'personajes'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
