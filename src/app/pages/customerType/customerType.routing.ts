import { Routes, RouterModule }  from '@angular/router';

import { CustomerType } from './customerType.component';
import { CustomerTypeForm } from './components/customerTypeForm/customerTypeForm.component';
import { CustomerTypeTable } from './components/customerTypeTable/customerTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CustomerType,
     children: [
      { path: 'form', component: CustomerTypeForm },
      { path: 'form/:id', component: CustomerTypeForm },
      { path: 'table', component: CustomerTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
