import { Routes, RouterModule }  from '@angular/router';

import { User } from './user.component';
import { UserForm } from './components/userForm/userForm.component';
import { UserTable } from './components/userTable/userTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: User,
     children: [
      { path: 'form', component: UserForm },
      { path: 'form/:id', component: UserForm },
      { path: 'table', component: UserTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
