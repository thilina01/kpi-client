import { Routes, RouterModule } from '@angular/router';

import { ScrapCostPerKg } from './scrapCostPerKg.component';
import { ScrapCostPerKgForm } from './components/scrapCostPerKgForm/scrapCostPerKgForm.component';
import { ScrapCostPerKgTable } from './components/scrapCostPerKgTable/scrapCostPerKgTable.component';

const routes: Routes = [
  {
    path: '',
    component: ScrapCostPerKg,
    children: [
      { path: 'form', component: ScrapCostPerKgForm },
      { path: 'form/:id', component: ScrapCostPerKgForm },
      { path: 'table', component: ScrapCostPerKgTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
