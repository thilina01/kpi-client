import { Routes, RouterModule } from '@angular/router';

import { SubcontractOperationRate } from './subcontractOperationRate.component';
import { SubcontractOperationRateForm } from './components/subcontractOperationRateForm/subcontractOperationRateForm.component';
import { SubcontractOperationRateTable } from './components/subcontractOperationRateTable/subcontractOperationRateTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: SubcontractOperationRate,
    children: [
      { path: 'form', component: SubcontractOperationRateForm },
      { path: 'form/:id', component: SubcontractOperationRateForm },
      { path: 'table', component: SubcontractOperationRateTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
