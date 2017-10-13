import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { ComputerType } from './computerType.component';
import { ComputerTypeTable } from './components/computerTypeTable/computerTypeTable.component';
import { ComputerTypeForm } from './components/computerTypeForm/computerTypeForm.component';

import { routing } from './computerType.routing';
import { ComputerTypeService } from './computerType.service';


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
    ComputerType,
    ComputerTypeTable,
    ComputerTypeForm
  ],
  providers: [
    ComputerTypeService
  ]
})
export class ComputerTypeModule { }
