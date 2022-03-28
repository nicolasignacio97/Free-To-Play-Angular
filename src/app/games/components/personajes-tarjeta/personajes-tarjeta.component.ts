import { Component, Input, OnInit } from '@angular/core';
import { Characters } from '../../interface/personaje.interface';

@Component({
  selector: 'app-personajes-tarjeta',
  templateUrl: './personajes-tarjeta.component.html',
  styles: [
    `
    mat-card {
      margin-top: 20px;
    }
    `
  ]
})
export class PersonajesTarjetaComponent implements OnInit {

  @Input() personaje!: Characters;

  constructor() { }

  ngOnInit(): void {
  }

}
