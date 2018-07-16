import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { ConsumableCostPerKg } from './consumableCostPerKg.component';
import { LossTypeService } from '../../services/lossType.service';
import { ConsumableCostPerKgTable } from './components/consumableCostPerKgTable/consumableCostPerKgTable.component';
import { ConsumableCostPerKgForm } from './components/consumableCostPerKgForm/consumableCostPerKgForm.component';

import { routing } from './consumableCostPerKg.routing';
import { ConsumableCostPerKgService } from './consumableCostPerKg.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    SharedModule,
    PanelModule,
    InputTextModule,
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
