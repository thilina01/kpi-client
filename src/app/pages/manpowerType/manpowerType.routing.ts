import { Routes, RouterModule }  from '@angular/router';

import { ManpowerType } from './manpowerType.component';
import { ManpowerTypeForm } from './components/manpowerTypeForm/manpowerTypeForm.component';
import { ManpowerTypeTable } from './components/manpowerTypeTable/manpowerTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ManpowerType,
     children: [
      { path: 'form', component: ManpowerTypeForm },
      { path: 'form/:id', component: ManpowerTypeForm },
      { path: 'table', component: ManpowerTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
