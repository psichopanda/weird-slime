import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.routes').then(r => r.routes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(r => r.routes)
  }
];
