import { Routes, RouterModule } from '@angular/router';

import { Defect } from './defect.component';
import { DefectForm } from './components/defectForm/defectForm.component';
import { DefectTable } from './components/defectTable/defectTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Defect,
    children: [
      { path: 'form', component: DefectForm },
      { path: 'form/:id', component: DefectForm },
      { path: 'table', component: DefectTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
