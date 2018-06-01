import { Routes, RouterModule } from '@angular/router';

import { InvoiceInformation } from './invoiceInformation.component';
import { InvoiceInformationTable } from './components/invoiceInformationTable/invoiceInformationTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: InvoiceInformation,
    children: [
      { path: 'table', component: InvoiceInformationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
