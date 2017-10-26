import { Routes, RouterModule } from '@angular/router';

import { ShiftRoster } from './shiftRoster.component';
import { ShiftRosterForm } from './components/shiftRosterForm/shiftRosterForm.component';
import { ShiftRosterTable } from './components/shiftRosterTable/shiftRosterTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ShiftRoster,
    children: [
      { path: 'form', component: ShiftRosterForm },
      { path: 'form/:id', component: ShiftRosterForm },
      { path: 'table', component: ShiftRosterTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
