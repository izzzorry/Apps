import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('../page1/page1.page').then((m) => m.Page1Page),
      },
      {
        path: 'tab5',
        loadComponent: () =>
          import('../page2/page2.page').then((m) => m.Page2Page),
      },
      {
        path: 'tab6',
        loadComponent: () =>
          import('../page3/page3.page').then((m) => m.Page3Page),
      },
      {
        path: 'tab7',
        loadComponent: () =>
          import('../page5/page5.page').then((m) => m.Page5Page),
      },
      {
        path: 'tab8',
        loadComponent: () =>
          import('../page6/page6.page').then((m) => m.Page6Page),
      },
      {
        path: 'tab9',
        loadComponent: () =>
          import('../page7/page7.page').then((m) => m.Page7Page),
      },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
