import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, AutoCompleteModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { ExchangeRate } from './exchangeRate.component';
import { ExchangeRateTable } from './components/exchangeRateTable/exchangeRateTable.component';
import { ExchangeRateForm } from './components/exchangeRateForm/exchangeRateForm.component';

import { routing } from './exchangeRate.routing';
import { ExchangeRateService } from './exchangeRate.service';
import { CurrencyService } from '../currency/currency.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    CalendarModule,
    routing
  ],
  declarations: [
    ExchangeRate,
    ExchangeRateTable,
    ExchangeRateForm
  ],
  providers: [
    ExchangeRateService,
    CurrencyService

  ]
})
export class ExchangeRateModule { }
