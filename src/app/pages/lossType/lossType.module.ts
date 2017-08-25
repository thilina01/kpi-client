import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { LossType } from './lossType.component';
import { LossTypeTable } from './components/lossTypeTable/lossTypeTable.component';
import { LossTypeForm } from './components/lossTypeForm/lossTypeForm.component';

import { routing } from './lossType.routing';
import { LossTypeService } from "./lossType.service";


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
    LossType,
    LossTypeTable,
    LossTypeForm
  ],
  providers: [
    LossTypeService
  ]
})
export class LossTypeModule { }
