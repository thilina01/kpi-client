import { Routes, RouterModule }  from '@angular/router';

import { FinanceSummary } from './financeSummary.component';
import { FinanceSummaryForm } from './components/financeSummaryForm/financeSummaryForm.component';
import { FinanceSummaryTable } from './components/financeSummaryTable/financeSummaryTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: FinanceSummary,
    children: [
      { path: 'form', component: FinanceSummaryForm },
      { path: 'form/:id', component: FinanceSummaryForm },
      { path: 'table', component: FinanceSummaryTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
