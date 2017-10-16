import { Routes, RouterModule } from '@angular/router';

import { Machine } from './machine.component';
import { MachineForm } from './components/machineForm/machineForm.component';
import { MachineTable } from './components/machineTable/machineTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Machine,
    children: [
      { path: 'form', component: MachineForm },
      { path: 'form/:id', component: MachineForm },
      { path: 'table', component: MachineTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
