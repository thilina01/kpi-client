import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { ConsumableCostPerKg } from './consumableCostPerKg.component';
import { ConsumableCostPerKgService } from '../../services/consumableCostPerKg.service';
import { LossTypeService } from '../../services/lossType.service';
import { ConsumableCostPerKgTable } from './components/consumableCostPerKgTable/consumableCostPerKgTable.component';
import { ConsumableCostPerKgForm } from './components/consumableCostPerKgForm/consumableCostPerKgForm.component';

import { routing } from './consumableCostPerKg.routing';


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
    routing
  ],
  declarations: [
    ConsumableCostPerKg,
    ConsumableCostPerKgTable,
    ConsumableCostPerKgForm
  ],
  providers: [ConsumableCostPerKgService]
})
export class ConsumableCostPerKgModule { }
