import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { EnergyConsumption } from './energyConsumption.component';
import { EnergyConsumptionService } from '../../services/energyConsumption.service';
import { LocationService } from '../../services/location.service';
import { LossTypeService } from '../../services/lossType.service';
import { EnergyConsumptionTable } from './components/energyConsumptionTable/energyConsumptionTable.component';
import { EnergyConsumptionForm } from './components/energyConsumptionForm/energyConsumptionForm.component';

import { routing } from './energyConsumption.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    MaterialModule.forRoot(),
    SharedModule,
    routing
  ],
  declarations: [
    EnergyConsumption,
    EnergyConsumptionTable,
    EnergyConsumptionForm
  ],
  providers: [EnergyConsumptionService, LocationService]
})
export class EnergyConsumptionModule { }
