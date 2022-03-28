import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { PersonajesComponent } from './pages/personajes/personajes.component';
import { BuscarComponent } from './pages/buscar/buscar.component';


const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    children: [
      { path: 'listado', component: ListadoComponent },
      { path: 'buscar', component: BuscarComponent },
      { path: ':id', component: PersonajesComponent },
      { path: '**', redirectTo: 'listado' }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GamesRoutingModule { }
