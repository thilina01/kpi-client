import { Routes, RouterModule } from '@angular/router';

import { Employee } from './employee.component';
import { EmployeeForm } from './components/employeeForm/employeeForm.component';
import { EmployeeTable } from './components/employeeTable/employeeTable.component';
import { ModuleWithProviders } from '@angular/core';
import { EmployeeImport } from './components/employeeImport/employeeImport.component';

export const routes: Routes = [
  {
    path: '',
    component: Employee,
    children: [
      { path: 'form', component: EmployeeForm },
      { path: 'form/:id', component: EmployeeForm },
      { path: 'table', component: EmployeeTable },
      { path: 'import', component: EmployeeImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
