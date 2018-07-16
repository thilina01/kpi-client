import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { CumulativeSalesPerKg } from './cumulativeSalesPerKg.component';
import { CumulativeSalesPerKgTable } from './components/cumulativeSalesPerKgTable/cumulativeSalesPerKgTable.component';
import { CumulativeSalesPerKgForm } from './components/cumulativeSalesPerKgForm/cumulativeSalesPerKgForm.component';

import { routing } from './cumulativeSalesPerKg.routing';
import { CumulativeSalesPerKgService } from './cumulativeSalesPerKg.service';

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
    CumulativeSalesPerKg,
    CumulativeSalesPerKgTable,
    CumulativeSalesPerKgForm
  ],
  providers: [CumulativeSalesPerKgService]
})
export class CumulativeSalesPerKgModule { }
