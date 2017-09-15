import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { ContainerSize } from './containerSize.component';
import { ContainerSizeTable } from './components/containerSizeTable/containerSizeTable.component';
import { ContainerSizeForm } from './components/containerSizeForm/containerSizeForm.component';

import { routing } from './containerSize.routing';
import { ContainerSizeService } from "./containerSize.service";


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
    ContainerSize,
    ContainerSizeTable,
    ContainerSizeForm
  ],
  providers: [
    ContainerSizeService
  ]
})
export class ContainerSizeModule { }
