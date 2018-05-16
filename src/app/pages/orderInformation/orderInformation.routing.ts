import { Routes, RouterModule } from '@angular/router';

import { OrderInformation } from './orderInformation.component';
import { OrderInformationTable } from './components/orderInformationTable/orderInformationTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: OrderInformation,
    children: [
      { path: 'table', component: OrderInformationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
