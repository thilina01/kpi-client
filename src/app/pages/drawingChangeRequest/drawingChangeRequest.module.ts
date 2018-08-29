import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { DrawingChangeRequest } from './drawingChangeRequest.component';
import { DrawingChangeRequestTable } from './components/drawingChangeRequestTable/drawingChangeRequestTable.component';
import { DrawingChangeRequestForm } from './components/drawingChangeRequestForm/drawingChangeRequestForm.component';

import { routing } from './drawingChangeRequest.routing';
import { DrawingChangeRequestService } from './drawingChangeRequest.service';
import { DrawingVersionService } from '../drawingVersion/drawingVersion.service';

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
    DrawingChangeRequest,
    DrawingChangeRequestTable,
    DrawingChangeRequestForm
  ],
  providers: [DrawingChangeRequestService, DrawingVersionService]
})
export class DrawingChangeRequestModule { }
