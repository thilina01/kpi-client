import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/components/calendar/calendar';

import { MailConfiguration } from './mailConfiguration.component';
import { MailConfigurationTable } from './components/mailConfigurationTable/mailConfigurationTable.component';
import { MailConfigurationForm } from './components/mailConfigurationForm/mailConfigurationForm.component';

import { routing } from './mailConfiguration.routing';
import { MailConfigurationService } from './mailConfiguration.service';

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
    MailConfiguration,
    MailConfigurationTable,
    MailConfigurationForm
  ],
  providers: [
    MailConfigurationService
  ]
})
export class MailConfigurationModule { }
