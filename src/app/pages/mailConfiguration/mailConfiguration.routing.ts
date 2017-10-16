import { Routes, RouterModule } from '@angular/router';

import { MailConfiguration } from './mailConfiguration.component';
import { MailConfigurationForm } from './components/mailConfigurationForm/mailConfigurationForm.component';
import { MailConfigurationTable } from './components/mailConfigurationTable/mailConfigurationTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: MailConfiguration,
    children: [
      { path: 'form', component: MailConfigurationForm },
      { path: 'form/:id', component: MailConfigurationForm },
      { path: 'table', component: MailConfigurationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
