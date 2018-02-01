import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { ToolBreakdown } from './toolBreakdown.component';
import { LossTypeService } from '../../services/lossType.service';
import { ToolBreakdownTable } from './components/toolBreakdownTable/toolBreakdownTable.component';
import { ToolBreakdownForm } from './components/toolBreakdownForm/toolBreakdownForm.component';

import { routing } from './toolBreakdown.routing';
import { ToolBreakdownService } from './toolBreakdown.service';
import { ToolService } from '../tool/tool.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    // MaterialModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    ToolBreakdown,
    ToolBreakdownTable,
    ToolBreakdownForm
  ],
  providers: [ToolBreakdownService, ToolService]
})
export class ToolBreakdownModule { }
