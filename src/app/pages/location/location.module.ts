import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { Location } from './location.component';
import { LocationService } from '../../services/location.service';
import { LocationTable } from './components/locationTable/locationTable.component';
import { LocationForm } from './components/locationForm/locationForm.component';

import { routing } from './location.routing';


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
    Location,
    LocationTable,
    LocationForm
  ],
  providers: [
    LocationService
  ]
})
export class LocationModule { }
