import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, AutoCompleteModule, CalendarModule } from 'primeng/primeng';

import { SubcontractOperationDefinition } from './subcontractOperationDefinition.component';
import { SubcontractOperationDefinitionTable } from './components/subcontractOperationDefinitionTable/subcontractOperationDefinitionTable.component';
import { SubcontractOperationDefinitionForm } from './components/subcontractOperationDefinitionForm/subcontractOperationDefinitionForm.component';

import { routing } from './subcontractOperationDefinition.routing';
import { SubcontractOperationDefinitionService } from './subcontractOperationDefinition.service';
import { ItemService } from '../item/item.service';
import { OperationTypeService } from '../operationType/operationType.service';
import { ProductTypeService } from '../productType/productType.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    CalendarModule,
    routing
  ],
  declarations: [
    SubcontractOperationDefinition,
    SubcontractOperationDefinitionTable,
    SubcontractOperationDefinitionForm
  ],
  providers: [
    SubcontractOperationDefinitionService,
    ItemService,
    OperationTypeService,
    ProductTypeService
  ]
})
export class SubcontractOperationDefinitionModule { }
