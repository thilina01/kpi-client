import { Routes, RouterModule } from '@angular/router';

import { Designation } from './designation.component';
import { DesignationForm } from './components/designationForm/designationForm.component';
import { DesignationTable } from './components/designationTable/designationTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Designation,
    children: [
      { path: 'form', component: DesignationForm },
      { path: 'form/:id', component: DesignationForm },
      { path: 'table', component: DesignationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
