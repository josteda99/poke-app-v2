import { Route } from '@angular/router';

export const POKEMON_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'prefix',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.component').then((c) => c.WelcomeComponent),
  },
  {
    path: 'list',
    loadComponent: () => import('./list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./detail/detail.component').then((c) => c.DetailComponent),
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'prefix' },
];
