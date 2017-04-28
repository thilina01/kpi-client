import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule } from 'primeng/primeng';

import { ControlPointMachine } from './controlPointMachine.component';
import { ControlPointMachineService } from '../../services/controlPointMachine.service';
import { ControlPointService } from '../../services/controlPoint.service';
import { MachineService } from '../../services/machine.service';
import { ControlPointMachineTable } from './components/controlPointMachineTable/controlPointMachineTable.component';
import { ControlPointMachineForm } from './components/controlPointMachineForm/controlPointMachineForm.component';

import { routing } from './controlPointMachine.routing';


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
