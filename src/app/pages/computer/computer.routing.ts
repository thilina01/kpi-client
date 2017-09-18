import { Routes, RouterModule }  from '@angular/router';

import { Computer } from './computer.component';
import { ComputerForm } from './components/computerForm/computerForm.component';
import { ComputerTable } from './components/computerTable/computerTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Computer,
     children: [
      { path: 'form', component: ComputerForm },
      { path: 'form/:id', component: ComputerForm },
      { path: 'table', component: ComputerTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
