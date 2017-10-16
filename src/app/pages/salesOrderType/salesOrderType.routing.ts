import { Routes, RouterModule } from '@angular/router';

import { SalesOrderType } from './salesOrderType.component';
import { SalesOrderTypeForm } from './components/salesOrderTypeForm/salesOrderTypeForm.component';
import { SalesOrderTypeTable } from './components/salesOrderTypeTable/salesOrderTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: SalesOrderType,
    children: [
      { path: 'form', component: SalesOrderTypeForm },
      { path: 'form/:id', component: SalesOrderTypeForm },
      { path: 'table', component: SalesOrderTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
