import { Routes, RouterModule } from '@angular/router';

import { Department } from './department.component';
import { DepartmentForm } from './components/departmentForm/departmentForm.component';
import { DepartmentTable } from './components/departmentTable/departmentTable.component';
import { ModuleWithProviders } from '@angular/core';
import { DepartmentImport } from './components/departmentImport/departmentImport.component';

export const routes: Routes = [
  {
    path: '',
    component: Department,
    children: [
      { path: 'form', component: DepartmentForm },
      { path: 'form/:id', component: DepartmentForm },
      { path: 'table', component: DepartmentTable },
      { path: 'import', component: DepartmentImport }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
