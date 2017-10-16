import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule } from 'primeng/primeng';

import { Operation } from './operation.component';
import { OperationTable } from './components/operationTable/operationTable.component';



import { routing } from './operation.routing';
import { ItemService } from '../item/item.service';
import { SectionService } from '../section/section.service';
import { OperationService } from './operation.service';
import { ShiftService } from '../shift/shift.service';
import { OperationTypeService } from '../operationType/operationType.service';

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
    AutoCompleteModule,
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
