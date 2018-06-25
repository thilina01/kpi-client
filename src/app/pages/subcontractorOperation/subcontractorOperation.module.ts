import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgaModule } from "../../theme/nga.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { MaterialModule } from '@angular/material';

import {
  DataTableModule,
  SharedModule,
  DialogModule,
  CalendarModule,
  PanelModule,
  InputTextModule,
  AutoCompleteModule
} from "primeng/primeng";

import { SubcontractorOperation } from "./subcontractorOperation.component";
import { LossTypeService } from "../../services/lossType.service";
import { SubcontractorOperationTable } from "./components/subcontractorOperationTable/subcontractorOperationTable.component";
import { SubcontractorOperationForm } from "./components/subcontractorOperationForm/subcontractorOperationForm.component";

import { routing } from "./subcontractorOperation.routing";
import { SubcontractorOperationService } from "./subcontractorOperation.service";
import { SubcontractorService } from "../subcontractor/subcontractor.service";
import { SubcontractOperationDefinitionService } from "../subcontractOperationDefinition/subcontractOperationDefinition.service";

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
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    SubcontractorOperation,
    SubcontractorOperationTable,
    SubcontractorOperationForm
  ],
  providers: [
    SubcontractorOperationService,
    SubcontractorService,
    SubcontractOperationDefinitionService
  ]
})
export class SubcontractorOperationModule {}
