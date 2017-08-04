import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { Currency } from './currency.component';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyTable } from './components/currencyTable/currencyTable.component';
import { CurrencyForm } from './components/currencyForm/currencyForm.component';

import { routing } from './currency.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    routing
  ],
  declarations: [
    Currency,
    CurrencyTable,
    CurrencyForm
  ],
  providers: [
    CurrencyService
  ]
})
export class CurrencyModule { }
