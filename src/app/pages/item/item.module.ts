import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, CheckboxModule, AutoCompleteModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Item } from './item.component';
import { ItemTable } from './components/itemTable/itemTable.component';
import { ItemForm } from './components/itemForm/itemForm.component';

import { routing } from './item.routing';
import { ItemService } from './item.service';
import { ItemTypeService } from '../itemType/itemType.service';
import { PaintService } from '../paint/paint.service';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    CheckboxModule,
    AutoCompleteModule,
    InputTextModule,
    CalendarModule,
    routing
  ],
  declarations: [
    Item,
    ItemTable,
    ItemForm
  ],
  providers: [
    ItemService,
    ItemTypeService,
    PaintService
  ]
})
export class ItemModule { }
