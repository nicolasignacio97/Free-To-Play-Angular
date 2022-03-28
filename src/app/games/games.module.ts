import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarComponent } from './pages/buscar/buscar.component';

import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { GamesRoutingModule } from './games-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { PersonajesTarjetaComponent } from './components/personajes-tarjeta/personajes-tarjeta.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { PersonajesComponent } from './pages/personajes/personajes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BuscarComponent,
    
    HomeComponent,
    ListadoComponent,
    PersonajesTarjetaComponent,
    ImagenPipe,
    PersonajesComponent 
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    GamesRoutingModule,
    MaterialModule
  ]
})
export class GamesModule { }
