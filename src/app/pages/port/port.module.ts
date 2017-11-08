import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, FileUploadModule } from 'primeng/primeng';

import { Port } from './port.component';
import { PortTable } from './components/portTable/portTable.component';
import { PortForm } from './components/portForm/portForm.component';

import { routing } from './port.routing';
import { PortService } from './port.service';
import { PortImport } from './components/portImport/portImport.component';

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
    Port,
    PortTable,
    PortForm,
    PortImport
    
  ],
  providers: [
    PortService
  ]
})
export class PortModule { }
