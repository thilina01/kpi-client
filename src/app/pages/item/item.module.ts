import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, CheckboxModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { Item } from './item.component';
import { ItemService } from '../../services/item.service';
import { ItemTypeService } from '../../services/itemType.service';
import { PaintService } from '../../services/paint.service';
import { ItemTable } from './components/itemTable/itemTable.component';
import { ItemForm } from './components/itemForm/itemForm.component';

import { routing } from './item.routing';


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
