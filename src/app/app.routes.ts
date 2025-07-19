import { Routes } from '@angular/router';
import { IntroGuard } from './core/guards/intro.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./screens/home/home.page').then((m) => m.HomePage),
    canActivate: [IntroGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadComponent: () =>
      import('./screens/intro/intro.page').then((m) => m.IntroPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./screens/login/login.page').then((m) => m.LoginPage),
  },
];
