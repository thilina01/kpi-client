import { Routes, RouterModule }  from '@angular/router';

import { LabourSource } from './labourSource.component';
import { LabourSourceForm } from './components/labourSourceForm/labourSourceForm.component';
import { LabourSourceTable } from './components/labourSourceTable/labourSourceTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: LabourSource,
     children: [
      { path: 'form', component: LabourSourceForm },
      { path: 'form/:id', component: LabourSourceForm },
      { path: 'table', component: LabourSourceTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
