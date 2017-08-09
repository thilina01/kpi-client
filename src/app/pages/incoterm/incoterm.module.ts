import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { Incoterm } from './incoterm.component';

import { IncotermTable } from './components/incotermTable/incotermTable.component';
import { IncotermForm } from './components/incotermForm/incotermForm.component';

import { routing } from './incoterm.routing';
import { IncotermService } from "./incoterm.service";


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
    Incoterm,
    IncotermTable,
    IncotermForm
  ],
  providers: [
    IncotermService
  ]
})
export class IncotermModule { }
