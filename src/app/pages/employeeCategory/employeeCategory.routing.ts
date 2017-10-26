import { Routes, RouterModule } from '@angular/router';

import { EmployeeCategory } from './employeeCategory.component';
import { EmployeeCategoryForm } from './components/employeeCategoryForm/employeeCategoryForm.component';
import { EmployeeCategoryTable } from './components/employeeCategoryTable/employeeCategoryTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeCategory,
    children: [
      { path: 'form', component: EmployeeCategoryForm },
      { path: 'form/:id', component: EmployeeCategoryForm },
      { path: 'table', component: EmployeeCategoryTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
