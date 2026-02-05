import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pokemon/pokemon.routes').then((m) => m.POKEMON_ROUTES),
  },
];
