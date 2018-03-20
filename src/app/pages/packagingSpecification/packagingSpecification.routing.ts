import { Routes, RouterModule } from '@angular/router';

import { PackagingSpecification } from './packagingSpecification.component';
import { PackagingSpecificationForm } from './components/packagingSpecificationForm/packagingSpecificationForm.component';
import { PackagingSpecificationTable } from './components/packagingSpecificationTable/packagingSpecificationTable.component';

const routes: Routes = [
  {
    path: '',
    component: PackagingSpecification,
    children: [
      { path: 'form', component: PackagingSpecificationForm },
      { path: 'form/:id', component: PackagingSpecificationForm },
      { path: 'table', component: PackagingSpecificationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
