import { Routes, RouterModule } from '@angular/router';

import { Supplier } from './supplier.component';
import { SupplierForm } from './components/supplierForm/supplierForm.component';
import { SupplierTable } from './components/supplierTable/supplierTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Supplier,
    children: [
      { path: 'form', component: SupplierForm },
      { path: 'form/:id', component: SupplierForm },
      { path: 'table', component: SupplierTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
