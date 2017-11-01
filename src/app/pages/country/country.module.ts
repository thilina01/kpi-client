import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgaModule} from '../../theme/nga.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  DataTableModule,
  SharedModule,
  PanelModule,
  InputTextModule,
  CalendarModule,
  FileUploadModule
} from 'primeng/primeng';

import {Country} from './country.component';

import {routing} from './country.routing';
import {CountryService} from './country.service';
import {CountryTable} from "./components/countryTable";
import {CountryForm} from "./components/countryForm";
import {CountryImport} from "./components/countryImport";

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
    Country,
    CountryTable,
    CountryForm,
    CountryImport
  ],
  providers: [
    CountryService
  ]
})
export class CountryModule {
}
