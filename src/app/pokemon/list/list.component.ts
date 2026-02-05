import { Component, inject, OnInit } from '@angular/core';
import { PokemonApiService } from '../services/pokemon.api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  private pokemonService = inject(PokemonApiService);

  public pokemons$ = this.pokemonService.getAllPokemons();

  ngOnInit() {
    this.pokemons$.subscribe((a) => console.log(a));
  }
}
