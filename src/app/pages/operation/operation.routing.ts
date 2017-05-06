import { Routes, RouterModule }  from '@angular/router';

import { Operation } from './operation.component';
import { OperationTable } from './components/operationTable/operationTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Operation,
     children: [
      { path: 'table', component: OperationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
