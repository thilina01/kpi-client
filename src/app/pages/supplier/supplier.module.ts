import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, AutoCompleteModule } from 'primeng/primeng';

import { Supplier } from './supplier.component';

import { SupplierTable } from './components/supplierTable/supplierTable.component';
import { SupplierForm } from './components/supplierForm/supplierForm.component';

import { routing } from './supplier.routing';
import { SupplierService } from './supplier.service';
import { SupplierTypeService } from '../supplierType/supplierType.service';
import { PaymentTermService } from '../paymentTerm/paymentTerm.service';
import { CurrencyService } from '../currency/currency.service';
import { DeliveryTermService } from '../deliveryTerm/deliveryTerm.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    CalendarModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    Supplier,
    SupplierTable,
    SupplierForm
  ],
  providers: [
    SupplierService,
    PaymentTermService,
    CurrencyService,
    DeliveryTermService,
    SupplierTypeService
  ]
})
export class SupplierModule { }
