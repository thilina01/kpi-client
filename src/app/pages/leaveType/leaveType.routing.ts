import { Routes, RouterModule }  from '@angular/router';

import { LeaveType } from './leaveType.component';
import { LeaveTypeForm } from './components/leaveTypeForm/leaveTypeForm.component';
import { LeaveTypeTable } from './components/leaveTypeTable/leaveTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: LeaveType,
     children: [
      { path: 'form', component: LeaveTypeForm },
      { path: 'form/:id', component: LeaveTypeForm },
      { path: 'table', component: LeaveTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
