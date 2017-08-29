import { Routes, RouterModule }  from '@angular/router';

import { AddressType } from './addressType.component';
import { AddressTypeForm } from './components/addressTypeForm/addressTypeForm.component';
import { AddressTypeTable } from './components/addressTypeTable/addressTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: AddressType,
     children: [
      { path: 'form', component: AddressTypeForm },
      { path: 'form/:id', component: AddressTypeForm },
      { path: 'table', component: AddressTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
