import { Routes, RouterModule } from '@angular/router';

import { ExchangeRate } from './exchangeRate.component';
import { ExchangeRateForm } from './components/exchangeRateForm/exchangeRateForm.component';
import { ExchangeRateTable } from './components/exchangeRateTable/exchangeRateTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ExchangeRate,
    children: [
      { path: 'form', component: ExchangeRateForm },
      { path: 'form/:id', component: ExchangeRateForm },
      { path: 'table', component: ExchangeRateTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
