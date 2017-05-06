import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { DataTableModule, SharedModule } from 'primeng/primeng';

import { Operation } from './operation.component';
import { OperationService } from '../../services/operation.service';
import { OperationTable } from './components/operationTable/operationTable.component';

import { routing } from './operation.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    DataTableModule,
    SharedModule,
    routing
  ],
  declarations: [
    Operation,
    OperationTable
  ],
  providers: [
    OperationService
  ]
})
export class OperationModule { }
