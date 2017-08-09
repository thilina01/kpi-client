import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { Paint } from './paint.component';
import { PaintTable } from './components/paintTable/paintTable.component';
import { PaintForm } from './components/paintForm/paintForm.component';

import { routing } from './paint.routing';
import { PaintService } from "./paint.service";


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
    Paint,
    PaintTable,
    PaintForm
  ],
  providers: [
    PaintService
  ]
})
export class PaintModule { }
