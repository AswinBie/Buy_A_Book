import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login') },
  { path: 'register', loadComponent: () => import('./pages/register/register') },
  {
    path: 'forget-password',
    loadComponent: () => import('./pages/forget-password/forget-password'),
  },
  { path: 'home', loadComponent: () => import('./pages/home/home') },
  { path: 'reset/:token', loadComponent: () => import('./pages/reset/reset') },
];
