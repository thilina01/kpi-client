import { Routes, RouterModule } from '@angular/router';

import { ProductType } from './productType.component';
import { ProductTypeForm } from './components/productTypeForm/productTypeForm.component';
import { ProductTypeTable } from './components/productTypeTable/productTypeTable.component';
import { ModuleWithProviders } from '@angular/core';
import { ProductTypeImport } from './components/productTypeImport/productTypeImport.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductType,
    children: [
      { path: 'form', component: ProductTypeForm },
      { path: 'form/:id', component: ProductTypeForm },
      { path: 'table', component: ProductTypeTable },
      { path: 'import', component: ProductTypeImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
