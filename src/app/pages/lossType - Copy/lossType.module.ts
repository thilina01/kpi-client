import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { LossType } from './lossType.component';
import { LossTypeService } from '../../services/lossType.service';
import { LossTypeTable } from './components/lossTypeTable/lossTypeTable.component';
import { LossTypeForm } from './components/lossTypeForm/lossTypeForm.component';

import { routing } from './lossType.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
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
