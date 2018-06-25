import { Routes, RouterModule } from '@angular/router';

import { SubcontractOperationDefinition } from './subcontractOperationDefinition.component';
import { SubcontractOperationDefinitionForm } from './components/subcontractOperationDefinitionForm/subcontractOperationDefinitionForm.component';
import { SubcontractOperationDefinitionTable } from './components/subcontractOperationDefinitionTable/subcontractOperationDefinitionTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: SubcontractOperationDefinition,
    children: [
      { path: 'form', component: SubcontractOperationDefinitionForm },
      { path: 'form/:id', component: SubcontractOperationDefinitionForm },
      { path: 'table', component: SubcontractOperationDefinitionTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
