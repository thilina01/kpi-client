import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { NotifyParty } from './notifyParty.component';
import { NotifyPartyTable } from './components/notifyPartyTable/notifyPartyTable.component';
import { NotifyPartyForm } from './components/notifyPartyForm/notifyPartyForm.component';

import { routing } from './notifyParty.routing';
import { NotifyPartyService } from './notifyParty.service';
import { CalendarModule } from 'primeng/components/calendar/calendar';


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
    NotifyParty,
    NotifyPartyTable,
    NotifyPartyForm
  ],
  providers: [
    NotifyPartyService
  ]
})
export class NotifyPartyModule { }
