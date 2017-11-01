import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, FileUploadModule } from 'primeng/primeng';

import { Currency } from './currency.component';
import { CurrencyTable } from './components/currencyTable/currencyTable.component';
import { CurrencyForm } from './components/currencyForm/currencyForm.component';

import { routing } from './currency.routing';
import { CurrencyService } from './currency.service';
import { CurrencyImport } from './components/currencyImport/currencyImport.component';

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
    CalendarModule,
    FileUploadModule,
    routing
  ],
  declarations: [
    Currency,
    CurrencyTable,
    CurrencyForm,
    CurrencyImport, 
    
  ],
  providers: [
    CurrencyService
  ]
})
export class CurrencyModule { }
