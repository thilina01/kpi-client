import { Routes, RouterModule } from '@angular/router';

import { SalesOrderBook } from './salesOrderBook.component';
import { SalesOrderBookTable } from './components/salesOrderBookTable/salesOrderBookTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: SalesOrderBook,
    children: [
      { path: 'table', component: SalesOrderBookTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
