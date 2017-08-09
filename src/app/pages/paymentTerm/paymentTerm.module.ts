import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { PaymentTerm } from './paymentTerm.component';
import { PaymentTermTable } from './components/paymentTermTable/paymentTermTable.component';
import { PaymentTermForm } from './components/paymentTermForm/paymentTermForm.component';

import { routing } from './paymentTerm.routing';
import { PaymentTermService } from "./paymentTerm.service";


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
    routing
  ],
  declarations: [
    PaymentTerm,
    PaymentTermTable,
    PaymentTermForm
  ],
  providers: [
    PaymentTermService
  ]
})
export class PaymentTermModule { }
