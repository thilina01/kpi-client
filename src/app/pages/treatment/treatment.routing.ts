import { Routes, RouterModule } from '@angular/router';

import { Treatment } from './treatment.component';
import { TreatmentTable } from './components/treatmentTable/treatmentTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Treatment,
    children: [
      { path: 'table', component: TreatmentTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
