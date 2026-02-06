import { Pokemon, PokemonDetail } from '../pokemon/models/pokemon.model';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { PokemonApiService } from '../pokemon/services/pokemon.api.service';
import { computed, inject, signal } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
interface PokemonState {
  pokemons: Pokemon[];
  isLoading: boolean;
  selectedPokemon: PokemonDetail | null;
  searchValue: string;
  favoriteFilter: boolean;
}

const initialState: PokemonState = {
  pokemons: [],
  isLoading: false,
  selectedPokemon: null,
  searchValue: '',
  favoriteFilter: false,
};

export const PokemonStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    filteredPokemons: computed(() => {
      const searchValue = store.searchValue().toLowerCase();
      const favoriteFilter = store.favoriteFilter();
      const pokemons = store.pokemons();

      if (searchValue === '' && favoriteFilter === false) return pokemons;

      return pokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchValue) && pokemon.favorite === favoriteFilter,
      );
    }),
  })),
  withMethods((store, pokemonService = inject(PokemonApiService)) => ({
    loadPokemons: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return pokemonService.getAllPokemons().pipe(
            tapResponse({
              next: (pokemons) => patchState(store, { pokemons, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),
    getPokemonDetails: rxMethod<string>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return pokemonService.getPokemonDetails(id).pipe(
            tapResponse({
              next: (selectedPokemon) => patchState(store, { selectedPokemon, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),
    changeSearchValue: (searchValue: string) => patchState(store, { searchValue }),
    changeFavoriteFilter: (favoriteFilter: boolean) => patchState(store, { favoriteFilter }),
    changeFavoriteValue: (pokemonId: string) =>
      patchState(store, {
        pokemons: store
          .pokemons()
          .map((pokemon) =>
            pokemon.id === pokemonId ? { ...pokemon, favorite: !pokemon.favorite } : pokemon,
          ),
      }),
  })),
);
