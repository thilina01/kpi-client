import { Routes, RouterModule } from '@angular/router';

import { AddressType } from './addressType.component';
import { AddressTypeForm } from './components/addressTypeForm/addressTypeForm.component';
import { AddressTypeTable } from './components/addressTypeTable/addressTypeTable.component';
import { ModuleWithProviders } from '@angular/core';
import { AddressTypeImport } from './components/addressTypeImport/addressTypeImport.component';

export const routes: Routes = [
  {
    path: '',
    component: AddressType,
    children: [
      { path: 'form', component: AddressTypeForm },
      { path: 'form/:id', component: AddressTypeForm },
      { path: 'table', component: AddressTypeTable },
      { path: 'import', component: AddressTypeImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
