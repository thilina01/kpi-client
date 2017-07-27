import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { CumulativeSalesPerKg } from './cumulativeSalesPerKg.component';
import { CumulativeSalesPerKgService } from '../../services/cumulativeSalesPerKg.service';
import { LossTypeService } from '../../services/lossType.service';
import { CumulativeSalesPerKgTable } from './components/cumulativeSalesPerKgTable/cumulativeSalesPerKgTable.component';
import { CumulativeSalesPerKgForm } from './components/cumulativeSalesPerKgForm/cumulativeSalesPerKgForm.component';

import { routing } from './cumulativeSalesPerKg.routing';


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
    CumulativeSalesPerKg,
    CumulativeSalesPerKgTable,
    CumulativeSalesPerKgForm
  ],
  providers: [CumulativeSalesPerKgService]
})
export class CumulativeSalesPerKgModule { }
