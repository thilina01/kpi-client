import { Routes, RouterModule } from '@angular/router';

import { Currency } from './currency.component';
import { CurrencyForm } from './components/currencyForm/currencyForm.component';
import { CurrencyTable } from './components/currencyTable/currencyTable.component';
import { ModuleWithProviders } from '@angular/core';
import { CurrencyImport } from './components/currencyImport/currencyImport.component';

export const routes: Routes = [
  {
    path: '',
    component: Currency,
    children: [
      { path: 'form', component: CurrencyForm },
      { path: 'form/:id', component: CurrencyForm },
      { path: 'table', component: CurrencyTable },
     { path: 'import', component: CurrencyImport }
      
    ]
  }
];

export const routing = RouterModule.forChild(routes);
