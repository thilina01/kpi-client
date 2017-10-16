import { Routes, RouterModule } from '@angular/router';

import { Shift } from './shift.component';
import { ShiftForm } from './components/shiftForm/shiftForm.component';
import { ShiftTable } from './components/shiftTable/shiftTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Shift,
    children: [
      { path: 'form', component: ShiftForm },
      { path: 'form/:id', component: ShiftForm },
      { path: 'table', component: ShiftTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
