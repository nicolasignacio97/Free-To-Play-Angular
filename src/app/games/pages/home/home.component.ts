import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Characters } from '../../interface/personaje.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .container{
      margin:10px
    }
    `
  ]
})
export class HomeComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
 
  }

}
