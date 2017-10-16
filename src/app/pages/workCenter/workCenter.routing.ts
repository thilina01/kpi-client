import { Routes, RouterModule } from '@angular/router';

import { WorkCenter } from './workCenter.component';
import { WorkCenterForm } from './components/workCenterForm/workCenterForm.component';
import { WorkCenterTable } from './components/workCenterTable/workCenterTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: WorkCenter,
    children: [
      { path: 'form', component: WorkCenterForm },
      { path: 'form/:id', component: WorkCenterForm },
      { path: 'table', component: WorkCenterTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
