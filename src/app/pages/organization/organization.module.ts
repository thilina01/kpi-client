import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Organization } from './organization.component';
import { OrganizationTable } from './components/organizationTable/organizationTable.component';
import { OrganizationForm } from './components/organizationForm/organizationForm.component';

import { routing } from './organization.routing';
import { OrganizationService } from './organization.service';

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
    Organization,
    OrganizationTable,
    OrganizationForm
  ],
  providers: [
    OrganizationService
  ]
})
export class OrganizationModule { }
