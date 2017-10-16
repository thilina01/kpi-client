import { Routes, RouterModule } from '@angular/router';

import { TreatmentType } from './treatmentType.component';
import { TreatmentTypeForm } from './components/treatmentTypeForm/treatmentTypeForm.component';
import { TreatmentTypeTable } from './components/treatmentTypeTable/treatmentTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: TreatmentType,
    children: [
      { path: 'form', component: TreatmentTypeForm },
      { path: 'form/:id', component: TreatmentTypeForm },
      { path: 'table', component: TreatmentTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
