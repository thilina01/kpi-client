import { Routes, RouterModule } from '@angular/router';

import { DeliveryTerm } from './deliveryTerm.component';
import { DeliveryTermForm } from './components/deliveryTermForm/deliveryTermForm.component';
import { DeliveryTermTable } from './components/deliveryTermTable/deliveryTermTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: DeliveryTerm,
    children: [
      { path: 'form', component: DeliveryTermForm },
      { path: 'form/:id', component: DeliveryTermForm },
      { path: 'table', component: DeliveryTermTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
