import { Routes, RouterModule } from '@angular/router';

import { LossType } from './lossType.component';
import { LossTypeForm } from './components/lossTypeForm/lossTypeForm.component';
import { LossTypeTable } from './components/lossTypeTable/lossTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: LossType,
    children: [
      { path: 'form', component: LossTypeForm },
      { path: 'form/:id', component: LossTypeForm },
      { path: 'table', component: LossTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
