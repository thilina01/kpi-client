import { Routes, RouterModule }  from '@angular/router';

import { Department } from './department.component';
import { DepartmentForm } from './components/departmentForm/departmentForm.component';
import { DepartmentTable } from './components/departmentTable/departmentTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Department,
     children: [
      { path: 'form', component: DepartmentForm },
      { path: 'form/:id', component: DepartmentForm },
      { path: 'table', component: DepartmentTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
