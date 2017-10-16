import { Routes, RouterModule } from '@angular/router';

import { Permission } from './permission.component';
import { PermissionForm } from './components/permissionForm/permissionForm.component';
import { PermissionTable } from './components/permissionTable/permissionTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Permission,
    children: [
      { path: 'form', component: PermissionForm },
      { path: 'form/:id', component: PermissionForm },
      { path: 'table', component: PermissionTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
