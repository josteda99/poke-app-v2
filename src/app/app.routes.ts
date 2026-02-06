import { Routes } from '@angular/router';
import { PokemonStore } from './store/pokemon.store';

export const routes: Routes = [
  {
    path: '',
    providers: [PokemonStore],
    loadChildren: () => import('./pokemon/pokemon.routes').then((m) => m.POKEMON_ROUTES),
  },
];
