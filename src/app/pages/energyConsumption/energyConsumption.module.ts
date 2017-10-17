import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { EnergyConsumption } from './energyConsumption.component';
import { LossTypeService } from '../../services/lossType.service';
import { EnergyConsumptionTable } from './components/energyConsumptionTable/energyConsumptionTable.component';
import { EnergyConsumptionForm } from './components/energyConsumptionForm/energyConsumptionForm.component';

import { routing } from './energyConsumption.routing';
import { EnergyConsumptionService } from './energyConsumption.service';
import { LocationService } from '../location/location.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    MaterialModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    EnergyConsumption,
    EnergyConsumptionTable,
    EnergyConsumptionForm
  ],
  providers: [
    EnergyConsumptionService,
    LocationService
  ]
})
export class EnergyConsumptionModule { }
