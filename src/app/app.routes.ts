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
  {
    path: 'page3',
    loadComponent: () => import('./componentes/page3/page3.page').then( m => m.Page3Page)
  },
  {
    path: 'page4/:id',
    loadComponent: () => import('./componentes/page4/page4.page').then( m => m.Page4Page)
  },
  {
    path: 'page5',
    loadComponent: () => import('./componentes/page5/page5.page').then( m => m.Page5Page)
  },
  {
    path: 'page6',
    loadComponent: () => import('./componentes/page6/page6.page').then( m => m.Page6Page)
  },
  {
    path: 'page7',
    loadComponent: () => import('./componentes/page7/page7.page').then( m => m.Page7Page)
  },
];
