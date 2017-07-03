import { Routes, RouterModule }  from '@angular/router';

import { ShiftType } from './shiftType.component';
import { ShiftTypeForm } from './components/shiftTypeForm/shiftTypeForm.component';
import { ShiftTypeTable } from './components/shiftTypeTable/shiftTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ShiftType,
     children: [
      { path: 'form', component: ShiftTypeForm },
      { path: 'form/:id', component: ShiftTypeForm },
      { path: 'table', component: ShiftTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
