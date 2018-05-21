import { Routes, RouterModule } from '@angular/router';

import { InvoiceType } from './invoiceType.component';
import { InvoiceTypeForm } from './components/invoiceTypeForm/invoiceTypeForm.component';
import { InvoiceTypeTable } from './components/invoiceTypeTable/invoiceTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: InvoiceType,
    children: [
      { path: 'form', component: InvoiceTypeForm },
      { path: 'form/:id', component: InvoiceTypeForm },
      { path: 'table', component: InvoiceTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
