import { Routes, RouterModule } from '@angular/router';

import { CustomerItem } from './customerItem.component';
import { CustomerItemForm } from './components/customerItemForm/customerItemForm.component';
import { CustomerItemTable } from './components/customerItemTable/customerItemTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: CustomerItem,
    children: [
      { path: 'form', component: CustomerItemForm },
      { path: 'form/:id', component: CustomerItemForm },
      { path: 'table', component: CustomerItemTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
