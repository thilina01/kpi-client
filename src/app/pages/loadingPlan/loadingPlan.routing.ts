import { Routes, RouterModule } from '@angular/router';

import { LoadingPlan } from './loadingPlan.component';
import { LoadingPlanForm } from './components/loadingPlanForm/loadingPlanForm.component';
import { LoadingPlanTable } from './components/loadingPlanTable/loadingPlanTable.component';
import { LoadingPlanPrint } from './components/loadingPlanPrint/loadingPlanPrint.component';

const routes: Routes = [
  {
    path: '',
    component: LoadingPlan,
    children: [
      { path: 'form', component: LoadingPlanForm },
      { path: 'form/:id', component: LoadingPlanForm },
      { path: 'table', component: LoadingPlanTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
