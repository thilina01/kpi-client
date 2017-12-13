import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Port } from './port.component';
import { PortTable } from './components/portTable/portTable.component';
import { PortForm } from './components/portForm/portForm.component';

import { routing } from './port.routing';
import { PortService } from './port.service';

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
    Port,
    PortTable,
    PortForm
  ],
  providers: [
    PortService
  ]
})
export class PortModule { }
