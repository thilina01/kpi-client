import { Routes, RouterModule } from '@angular/router';

import { OperationProgress } from './operationProgress.component';
import { OperationProgressForm } from './components/operationProgressForm/operationProgressForm.component';
import { OperationProgressTable } from './components/operationProgressTable/operationProgressTable.component';
import { OperationProgressSummary } from './components/operationProgressSummary';

const routes: Routes = [
  {
    path: '',
    component: OperationProgress,
    children: [
      { path: 'form', component: OperationProgressForm },
      { path: 'form/:id', component: OperationProgressForm },
      { path: 'table', component: OperationProgressTable },
      { path: 'summary', component: OperationProgressSummary }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
