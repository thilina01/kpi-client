import { Routes, RouterModule } from '@angular/router';

import { DesignationType } from './designationType.component';
import { DesignationTypeForm } from './components/designationTypeForm/designationTypeForm.component';
import { DesignationTypeTable } from './components/designationTypeTable/designationTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: DesignationType,
    children: [
      { path: 'form', component: DesignationTypeForm },
      { path: 'form/:id', component: DesignationTypeForm },
      { path: 'table', component: DesignationTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
