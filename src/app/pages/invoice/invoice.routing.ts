import { Routes, RouterModule } from '@angular/router';

import { Invoice } from './invoice.component';
import { InvoiceForm } from './components/invoiceForm/invoiceForm.component';
import { InvoiceTable } from './components/invoiceTable/invoiceTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Invoice,
    children: [
      { path: 'form', component: InvoiceForm },
      { path: 'form/:id', component: InvoiceForm },
      { path: 'table', component: InvoiceTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
