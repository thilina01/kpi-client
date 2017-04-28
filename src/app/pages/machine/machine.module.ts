import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { Machine } from './machine.component';
import { MachineService } from '../../services/machine.service';
import { MachineTable } from './components/machineTable/machineTable.component';
import { MachineForm } from './components/machineForm/machineForm.component';

import { routing } from './machine.routing';


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
    Machine,
    MachineTable,
    MachineForm
  ],
  providers: [
    MachineService
  ]
})
export class MachineModule { }
