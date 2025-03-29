import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./componentes/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'page1',
    loadComponent: () => import('./componentes/page1/page1.page').then( m => m.Page1Page)
  },
  {
    path: 'page2',
    loadComponent: () => import('./componentes/page2/page2.page').then( m => m.Page2Page)
  },
];
