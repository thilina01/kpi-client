import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule, FileUploadModule } from 'primeng/primeng';

import { DrawingVersion } from './drawingVersion.component';
import { DrawingVersionTable } from './components/drawingVersionTable/drawingVersionTable.component';
import { DrawingVersionForm } from './components/drawingVersionForm/drawingVersionForm.component';

import { routing } from './drawingVersion.routing';
import { DrawingVersionService } from './drawingVersion.service';
import { ItemService } from '../item/item.service';
import { DrawingChangeRequestService } from '../drawingChangeRequest/drawingChangeRequest.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
    FileUploadModule,

    // BrowserModule,
    // HttpClientModule,
    routing
  ],
  declarations: [
    DrawingVersion,
    DrawingVersionTable,
    DrawingVersionForm
  ],
  providers: [DrawingVersionService, ItemService,DrawingChangeRequestService]
})
export class DrawingVersionModule { }
