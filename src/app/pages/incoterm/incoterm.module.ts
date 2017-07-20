import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { Incoterm } from './incoterm.component';
import { IncotermService } from '../../services/incoterm.service';
import { IncotermTable } from './components/incotermTable/incotermTable.component';
import { IncotermForm } from './components/incotermForm/incotermForm.component';

import { routing } from './incoterm.routing';


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
    Incoterm,
    IncotermTable,
    IncotermForm
  ],
  providers: [
    IncotermService
  ]
})
export class IncotermModule { }
