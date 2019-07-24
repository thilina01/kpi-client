import { Routes, RouterModule } from '@angular/router';

import { InternalTransferInformation } from './internalTransferInformation.component';
import { InternalTransferInformationTable } from './components/internalTransferInformationTable/internalTransferInformationTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: InternalTransferInformation,
    children: [
      { path: 'table', component: InternalTransferInformationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
