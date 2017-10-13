import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { OperationType } from './operationType.component';
import { OperationTypeTable } from './components/operationTypeTable/operationTypeTable.component';
import { OperationTypeForm } from './components/operationTypeForm/operationTypeForm.component';

import { routing } from './operationType.routing';
import { OperationTypeService } from './operationType.service';
import { CalendarModule } from 'primeng/components/calendar/calendar';


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
    OperationType,
    OperationTypeTable,
    OperationTypeForm
  ],
  providers: [
    OperationTypeService
  ]
})
export class OperationTypeModule { }
