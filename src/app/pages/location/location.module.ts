import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { Location } from './location.component';
import { LocationTable } from './components/locationTable/locationTable.component';
import { LocationForm } from './components/locationForm/locationForm.component';

import { routing } from './location.routing';
import { LocationService } from './location.service';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    CalendarModule,
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    Location,
    LocationTable,
    LocationForm
  ],
  providers: [
    LocationService,
  ]
})
export class LocationModule { }
