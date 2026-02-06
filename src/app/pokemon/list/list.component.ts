import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonStore } from '../../store/pokemon.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  private _store = inject(PokemonStore);

  public searchInputValue = this._store.searchValue;
  public pokemons = this._store.filteredPokemons;

  ngOnInit() {
    this._store.loadPokemons();
  }

  public changeSearchValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this._store.changeSearchValue(input.value ?? '');
  }

  public changeFavoriteValue(pokemonId: string, event: Event) {
    event.preventDefault();
    this._store.changeFavoriteValue(pokemonId);
  }
}
