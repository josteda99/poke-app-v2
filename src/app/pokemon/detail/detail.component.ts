import { Component, inject, OnInit } from '@angular/core';
import { PokemonStore } from '../../store/pokemon.store';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail',
  imports: [RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  private _store = inject(PokemonStore);
  private _route = inject(ActivatedRoute);

  public pokemon = this._store.selectedPokemon;

  ngOnInit() {
    const pokemonId = this._route.snapshot.paramMap.get('id') ?? '';
    this._store.getPokemonDetails(pokemonId);
  }
}
