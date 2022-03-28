import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Characters } from '../../interface/personaje.interface';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  personajes: Characters[] = [];

  personajeSelecccionado !: Characters[]

  constructor(private personajesService: GamesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.personajesService.getPersonajeByName(this.termino).subscribe(
      (personajes: Characters[]) => {
        this.personajes = personajes;
      }
    );
  }

  opcionSeleccionada(evento: MatAutocompleteSelectedEvent) {
    const personaje: Characters = evento.option.value;
    this.personajesService.getPersonajeByName(this.termino).subscribe(
      (personajes: Characters[]) => {
        this.personajes = personajes;
      }
    );
  }

}
