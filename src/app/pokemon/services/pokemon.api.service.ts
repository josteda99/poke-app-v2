import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonRequest } from '../models/pokemon.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private http = inject(HttpClient);

  public getAllPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonRequest>('https://pokeapi.co/api/v2/pokemon')
      .pipe(map(({ results }) => results.map((r) => ({ ...r, favorite: false }))));
  }
}
