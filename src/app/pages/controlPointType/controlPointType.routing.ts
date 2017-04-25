import { Routes, RouterModule }  from '@angular/router';

import { ControlPointType } from './controlPointType.component';
import { ControlPointTypeForm } from './components/controlPointTypeForm/controlPointTypeForm.component';
import { ControlPointTypeTable } from './components/controlPointTypeTable/controlPointTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ControlPointType,
     children: [
      { path: 'form', component: ControlPointTypeForm },
      { path: 'form/:id', component: ControlPointTypeForm },
      { path: 'table', component: ControlPointTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
