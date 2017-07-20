import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { PaymentTerm } from './paymentTerm.component';
import { PaymentTermService } from '../../services/paymentTerm.service';
import { PaymentTermTable } from './components/paymentTermTable/paymentTermTable.component';
import { PaymentTermForm } from './components/paymentTermForm/paymentTermForm.component';

import { routing } from './paymentTerm.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
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
