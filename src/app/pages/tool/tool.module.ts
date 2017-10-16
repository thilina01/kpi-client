import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Tool } from './tool.component';
import { ToolTable } from './components/toolTable/toolTable.component';
import { ToolForm } from './components/toolForm/toolForm.component';

import { routing } from './tool.routing';
import { ToolService } from './tool.service';

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
    Tool,
    ToolTable,
    ToolForm
  ],
  providers: [
    ToolService
  ]
})
export class ToolModule { }
