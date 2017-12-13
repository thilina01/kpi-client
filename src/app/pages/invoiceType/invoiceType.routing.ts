import { Routes, RouterModule } from '@angular/router';

import { InvoiceType } from './invoiceType.component';
import { InvoiceTypeForm } from './components/invoiceTypeForm/invoiceTypeForm.component';
import { InvoiceTypeTable } from './components/invoiceTypeTable/invoiceTypeTable.component';
import { ModuleWithProviders } from '@angular/core';
import { InvoiceTypeImport } from './components/invoiceTypeImport/invoiceTypeImport.component';

export const routes: Routes = [
  {
    path: '',
    component: InvoiceType,
    children: [
      { path: 'form', component: InvoiceTypeForm },
      { path: 'form/:id', component: InvoiceTypeForm },
      { path: 'table', component: InvoiceTypeTable },
      { path: 'import', component: InvoiceTypeImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
