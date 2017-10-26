import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { ShiftRoster } from './shiftRoster.component';
import { ShiftRosterTable } from './components/shiftRosterTable/shiftRosterTable.component';
import { ShiftRosterForm } from './components/shiftRosterForm/shiftRosterForm.component';

import { routing } from './shiftRoster.routing';
import { ShiftRosterService } from './shiftRoster.service';

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
    ShiftRoster,
    ShiftRosterTable,
    ShiftRosterForm
  ],
  providers: [
    ShiftRosterService
  ]
})
export class ShiftRosterModule { }
