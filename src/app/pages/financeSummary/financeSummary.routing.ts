import { Routes, RouterModule } from '@angular/router';

import { FinanceSummary } from './financeSummary.component';
import { FinanceSummaryForm } from './components/financeSummaryForm/financeSummaryForm.component';
import { FinanceSummaryTable } from './components/financeSummaryTable/financeSummaryTable.component';
import { FinanceSummaryChart } from './components/financeSummaryChart';

const routes: Routes = [
  {
    path: '',
    component: FinanceSummary,
    children: [
      { path: 'form', component: FinanceSummaryForm },
      { path: 'form/:id', component: FinanceSummaryForm },
      { path: 'table', component: FinanceSummaryTable },
      { path: 'chart', component: FinanceSummaryChart }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
