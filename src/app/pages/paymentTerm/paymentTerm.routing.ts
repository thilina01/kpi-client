import { Routes, RouterModule } from '@angular/router';

import { PaymentTerm } from './paymentTerm.component';
import { PaymentTermForm } from './components/paymentTermForm/paymentTermForm.component';
import { PaymentTermTable } from './components/paymentTermTable/paymentTermTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: PaymentTerm,
    children: [
      { path: 'form', component: PaymentTermForm },
      { path: 'form/:id', component: PaymentTermForm },
      { path: 'table', component: PaymentTermTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
