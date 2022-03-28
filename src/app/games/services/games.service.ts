import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Characters } from '../interface/personaje.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  endpoind = 'https://breakingbadapi.com/api/'

  getPersonaje() {
    return this.http.get<Characters[]>(`${this.endpoind}characters`);
  }
  getPersonajeById(id: number) {
    return this.http.get<Characters[]>(`${this.endpoind}characters/${id}`);
  }
  getPersonajeByName(termino: string) {
    return this.http.get<Characters[]>(`${this.endpoind}characters?name=${termino}`);
  }
}
