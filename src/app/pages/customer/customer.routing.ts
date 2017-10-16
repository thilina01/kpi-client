import { Routes, RouterModule } from '@angular/router';

import { Customer } from './customer.component';
import { ModuleWithProviders } from '@angular/core';
import { CustomerForm } from "./component/customerForm/customerForm.component";
import { CustomerTable } from "./component/customerTable/customerTable.component";

export const routes: Routes = [
  {
    path: '',
    component: Customer,
    children: [
      { path: 'form', component: CustomerForm },
      { path: 'form/:id', component: CustomerForm },
      { path: 'table', component: CustomerTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
