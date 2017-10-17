import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Country } from './country.component';
import { CountryTable } from './components/countryTable/countryTable.component';
import { CountryForm } from './components/countryForm/countryForm.component';

import { routing } from './country.routing';
import { CountryService } from './country.service';

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
    routing
  ],
  declarations: [
    Country,
    CountryTable,
    CountryForm
  ],
  providers: [
    CountryService
  ]
})
export class CountryModule { }
