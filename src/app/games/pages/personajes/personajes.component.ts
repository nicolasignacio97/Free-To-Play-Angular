import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Characters } from '../../interface/personaje.interface';
import { GamesService } from '../../services/games.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styles: [
    `
    img{
      width: 100%;
      height:70%;
      border-radius: 10px;
    }
    `
  ]
})
export class PersonajesComponent implements OnInit {

  constructor(private activateRouted: ActivatedRoute,
    private personajeSevice: GamesService,
    private router: Router) { }
  personaje!: Characters;
  ngOnInit(): void {
    this.activateRouted.params
      .pipe(
        switchMap(({ id }) => this.personajeSevice.getPersonajeById(id))
      )
      .subscribe(personaje => this.personaje = personaje[0]);
  }
  regresar() {
    this.router.navigate(['/personajes/listado']);
  }
}
