import { Routes, RouterModule } from '@angular/router';

import { ComputerType } from './computerType.component';
import { ComputerTypeForm } from './components/computerTypeForm/computerTypeForm.component';
import { ComputerTypeTable } from './components/computerTypeTable/computerTypeTable.component';
import { ModuleWithProviders } from '@angular/core';
import { ComputerTypeImport } from './components/computerTypeImport/computerTypeImport.component';

export const routes: Routes = [
  {
    path: '',
    component: ComputerType,
    children: [
      { path: 'form', component: ComputerTypeForm },
      { path: 'form/:id', component: ComputerTypeForm },
      { path: 'table', component: ComputerTypeTable },
      { path: 'import', component: ComputerTypeImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
