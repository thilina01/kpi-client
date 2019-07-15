import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';

import { RawMaterialItem } from './rawMaterialItem.component';
import { RawMaterialItemTable } from './components/rawMaterialItemTable/rawMaterialItemTable.component';
import { RawMaterialItemForm } from './components/rawMaterialItemForm/rawMaterialItemForm.component';

import { routing } from './rawMaterialItem.routing';
import { RawMaterialItemService } from './rawMaterialItem.service';

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
    InputTextModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    RawMaterialItem,
    RawMaterialItemTable,
    RawMaterialItemForm
  ],
  providers: [
    RawMaterialItemService,
  ]
})
export class RawMaterialItemModule { }
