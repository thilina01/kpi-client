import { Routes, RouterModule }  from '@angular/router';

import { LossReason } from './lossReason.component';
import { LossReasonForm } from './components/lossReasonForm/lossReasonForm.component';
import { LossReasonTable } from './components/lossReasonTable/lossReasonTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: LossReason,
     children: [
      { path: 'form', component: LossReasonForm },
      { path: 'form/:id', component: LossReasonForm },
      { path: 'table', component: LossReasonTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
