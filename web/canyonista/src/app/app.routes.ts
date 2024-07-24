import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./search/search.component').then(i => i.SearchComponent)},
  {path: 'info', loadComponent: () => import('./info/info.component').then(i => i.InfoComponent)},
  {path: 'detail/:id', loadComponent: () => import('./details/details.component').then(i => i.DetailsComponent)},
  {path: 'hydro/:id', loadComponent: () => import('./hydro-station/hydro-station.component').then(i => i.HydroStationComponent)},
  {path: 'hydropipe/:id', loadComponent: () => import('./hydro-pipe/hydro-pipe.component').then(i => i.HydroPipeComponent)},
  {path: 'meteo/:id', loadComponent: () => import('./meteo-station/meteo-station.component').then(i => i.MeteoStationComponent)},
  {path: 'reload', loadComponent: () => import('./reload-fix/reload-fix.component').then(i => i.ReloadFixComponent)},
];
