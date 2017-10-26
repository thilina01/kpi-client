import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { DesignationType } from './designationType.component';
import { DesignationTypeTable } from './components/designationTypeTable/designationTypeTable.component';
import { DesignationTypeForm } from './components/designationTypeForm/designationTypeForm.component';

import { routing } from './designationType.routing';
import { DesignationTypeService } from './designationType.service';

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
    DesignationType,
    DesignationTypeTable,
    DesignationTypeForm
  ],
  providers: [
    DesignationTypeService
  ]
})
export class DesignationTypeModule { }
