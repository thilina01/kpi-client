import { Routes, RouterModule }  from '@angular/router';

import { OperationType } from './operationType.component';
import { OperationTypeForm } from './components/operationTypeForm/operationTypeForm.component';
import { OperationTypeTable } from './components/operationTypeTable/operationTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: OperationType,
     children: [
      { path: 'form', component: OperationTypeForm },
      { path: 'form/:id', component: OperationTypeForm },
      { path: 'table', component: OperationTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
