import { Routes } from '@angular/router';
import { IntroGuard } from './core/guards/intro.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/home',
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
      import('./screens/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./screens/menu/menu.page').then((m) => m.MenuPage),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./screens/home/home.page').then((m) => m.HomePage),
        canActivate: [AuthGuard, IntroGuard],
      },
    ],
  },
  {
    path: 'song-modal',
    loadComponent: () => import('./screens/song-modal/song-modal.page').then( m => m.SongModalPage)
  },
];
