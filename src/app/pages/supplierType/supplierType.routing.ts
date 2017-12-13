import { Routes, RouterModule } from '@angular/router';

import { SupplierType } from './supplierType.component';
import { SupplierTypeForm } from './components/supplierTypeForm/supplierTypeForm.component';
import { SupplierTypeTable } from './components/supplierTypeTable/supplierTypeTable.component';
import { ModuleWithProviders } from '@angular/core';
import { SupplierTypeImport } from './components/supplierTypeImport/supplierTypeImport.component';

export const routes: Routes = [
  {
    path: '',
    component: SupplierType,
    children: [
      { path: 'form', component: SupplierTypeForm },
      { path: 'form/:id', component: SupplierTypeForm },
      { path: 'table', component: SupplierTypeTable },
      { path: 'import', component: SupplierTypeImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
