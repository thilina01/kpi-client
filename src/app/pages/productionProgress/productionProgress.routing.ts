import { Routes, RouterModule } from '@angular/router';

import { ProductionProgress } from './productionProgress.component';
import { ProductionProgressForm } from './components/productionProgressForm/productionProgressForm.component';
import { ProductionProgressTable } from './components/productionProgressTable/productionProgressTable.component';

const routes: Routes = [
  {
    path: '',
    component: ProductionProgress,
    children: [
      { path: 'form', component: ProductionProgressForm },
      { path: 'form/:id', component: ProductionProgressForm },
      { path: 'table', component: ProductionProgressTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
