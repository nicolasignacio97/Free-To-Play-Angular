import { Component, OnInit } from '@angular/core';
import { Characters } from '../../interface/personaje.interface';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',

})
export class ListadoComponent implements OnInit {
  personajes: Characters[] = [];
  constructor(private games: GamesService) { }

  ngOnInit(): void {
    this.games.getPersonaje()
      .subscribe(resp => {
        this.personajes = resp;
      });
  }

}
