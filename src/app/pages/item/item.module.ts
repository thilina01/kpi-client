import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { DataTableModule, SharedModule } from 'primeng/primeng';

import { Item } from './item.component';
import { ItemService } from '../../services/item.service';
import { ItemTable } from './components/itemTable/itemTable.component';

import { routing } from './item.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    DataTableModule,
    SharedModule,
    routing
  ],
  declarations: [
    Item,
    ItemTable
  ],
  providers: [
    ItemService
  ]
})
export class ItemModule { }
