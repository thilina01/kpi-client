import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, AutoCompleteModule, CalendarModule } from 'primeng/primeng';

import { ControlPointMachine } from './controlPointMachine.component';

import { ControlPointMachineTable } from './components/controlPointMachineTable/controlPointMachineTable.component';
import { ControlPointMachineForm } from './components/controlPointMachineForm/controlPointMachineForm.component';

import { routing } from './controlPointMachine.routing';
import { MachineService } from "../machine/machine.service";

import { ControlPointMachineService } from "./controlPointMachine.service";
import { ControlPointService } from "../controlPoint/controlPoint.service";




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
    CalendarModule,
    routing
  ],
  declarations: [
    ControlPointMachine,
    ControlPointMachineTable,
    ControlPointMachineForm
  ],
  providers: [
    ControlPointMachineService,
    ControlPointService,
    MachineService
  ]
})
export class ControlPointMachineModule { }
