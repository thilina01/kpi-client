import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, AutoCompleteModule, CalendarModule } from 'primeng/primeng';

import { CustomerItem } from './customerItem.component';

import { CustomerItemTable } from './components/customerItemTable/customerItemTable.component';
import { CustomerItemForm } from './components/customerItemForm/customerItemForm.component';

import { routing } from './customerItem.routing';
import { CustomerItemService } from './customerItem.service';
import { ItemService } from '../item/item.service';
import { CustomerService } from '../customer/customer.service';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    CalendarModule,
    routing
  ],
  declarations: [
    CustomerItem,
    CustomerItemTable,
    CustomerItemForm
  ],
  providers: [
    CustomerItemService,
    CustomerService,
    ItemService
  ]
})
export class CustomerItemModule { }
