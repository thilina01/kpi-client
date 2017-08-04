import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { Tool } from './tool.component';
import { ToolService } from '../../services/tool.service';
import { ToolTable } from './components/toolTable/toolTable.component';
import { ToolForm } from './components/toolForm/toolForm.component';

import { routing } from './tool.routing';


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
