import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { ItemType } from './itemType.component';
import { ItemTypeTable } from './components/itemTypeTable/itemTypeTable.component';
import { ItemTypeForm } from './components/itemTypeForm/itemTypeForm.component';

import { routing } from './itemType.routing';
import { ItemTypeService } from './itemType.service';

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
    ItemType,
    ItemTypeTable,
    ItemTypeForm
  ],
  providers: [
    ItemTypeService
  ]
})
export class ItemTypeModule { }
