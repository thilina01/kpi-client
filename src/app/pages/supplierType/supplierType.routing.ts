import { Routes, RouterModule } from '@angular/router';

import { SupplierType } from './supplierType.component';
import { SupplierTypeForm } from './components/supplierTypeForm/supplierTypeForm.component';
import { SupplierTypeTable } from './components/supplierTypeTable/supplierTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: SupplierType,
    children: [
      { path: 'form', component: SupplierTypeForm },
      { path: 'form/:id', component: SupplierTypeForm },
      { path: 'table', component: SupplierTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
