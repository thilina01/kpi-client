import { Routes, RouterModule } from '@angular/router';

import { CostCenter } from './costCenter.component';
import { CostCenterForm } from './components/costCenterForm/costCenterForm.component';
import { CostCenterTable } from './components/costCenterTable/costCenterTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: CostCenter,
    children: [
      { path: 'form', component: CostCenterForm },
      { path: 'form/:id', component: CostCenterForm },
      { path: 'table', component: CostCenterTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
