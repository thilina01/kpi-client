import { Routes, RouterModule } from '@angular/router';

import { ControlPoint } from './controlPoint.component';
import { ControlPointForm } from './components/controlPointForm/controlPointForm.component';
import { ControlPointTable } from './components/controlPointTable/controlPointTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ControlPoint,
    children: [
      { path: 'form', component: ControlPointForm },
      { path: 'form/:id', component: ControlPointForm },
      { path: 'table', component: ControlPointTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
