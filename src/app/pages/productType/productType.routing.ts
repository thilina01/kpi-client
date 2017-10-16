import { Routes, RouterModule } from '@angular/router';

import { ProductType } from './productType.component';
import { ProductTypeForm } from './components/productTypeForm/productTypeForm.component';
import { ProductTypeTable } from './components/productTypeTable/productTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ProductType,
    children: [
      { path: 'form', component: ProductTypeForm },
      { path: 'form/:id', component: ProductTypeForm },
      { path: 'table', component: ProductTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
