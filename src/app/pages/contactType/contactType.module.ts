import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { ContactType } from './contactType.component';
import { ContactTypeTable } from './components/contactTypeTable/contactTypeTable.component';
import { ContactTypeForm } from './components/contactTypeForm/contactTypeForm.component';

import { routing } from './contactType.routing';
import { ContactTypeService } from './contactType.service';

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
    ContactType,
    ContactTypeTable,
    ContactTypeForm
  ],
  providers: [
    ContactTypeService
  ]
})
export class ContactTypeModule { }
