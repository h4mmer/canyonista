import { ApplicationConfig } from '@angular/core';
import {
  ActivatedRouteSnapshot, DetachedRouteHandle,
  ExtraOptions,
  provideRouter,
  RouteReuseStrategy,
  withRouterConfig
} from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient} from "@angular/common/http";
import { provideIonicAngular } from '@ionic/angular/standalone';
const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withRouterConfig(routerOptions)),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(), provideIonicAngular({}),
  ]
};
