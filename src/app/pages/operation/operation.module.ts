import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule } from 'primeng/primeng';

import { Operation } from './operation.component';
import { OperationService } from '../../services/operation.service';
import { OperationTypeService } from '../../services/operationType.service';
import { ItemService } from '../../services/item.service';
import { OperationTable } from './components/operationTable/operationTable.component';

import { SectionService } from '../../services/section.service';
import { ShiftService } from '../../services/shift.service';
import { routing } from './operation.routing';


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
    routing
  ],
  declarations: [
    Operation,
    OperationTable
  ],
  providers: [
    OperationService,
    OperationTypeService,
    SectionService,
    ItemService,
    ShiftService
  ]
})
export class OperationModule { }
