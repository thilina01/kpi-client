import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, FileUploadModule } from 'primeng/primeng';

import { Incoterm } from './incoterm.component';
import { IncotermTable } from './components/incotermTable/incotermTable.component';
import { IncotermForm } from './components/incotermForm/incotermForm.component';

import { routing } from './incoterm.routing';
import { IncotermService } from './incoterm.service';
import { IncotermImport } from './components/incotermImport/incotermImport.component';

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
    FileUploadModule,    
    routing
  ],
  declarations: [
    Incoterm,
    IncotermTable,
    IncotermForm,
    IncotermImport
    

  ],
  providers: [
    IncotermService
  ]
})
export class IncotermModule { }
