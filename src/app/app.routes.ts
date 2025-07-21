import { Routes } from '@angular/router';
import { IntroGuard } from './core/guards/intro.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./screens/home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard, IntroGuard],
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
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./screens/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./screens/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
];
