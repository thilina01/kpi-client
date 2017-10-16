import { Routes, RouterModule } from '@angular/router';

import { ControlPointMachine } from './controlPointMachine.component';
import { ControlPointMachineForm } from './components/controlPointMachineForm/controlPointMachineForm.component';
import { ControlPointMachineTable } from './components/controlPointMachineTable/controlPointMachineTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ControlPointMachine,
    children: [
      { path: 'form', component: ControlPointMachineForm },
      { path: 'form/:id', component: ControlPointMachineForm },
      { path: 'table', component: ControlPointMachineTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
