import { Routes, RouterModule } from '@angular/router';

import { Application } from './application.component';
import { ApplicationForm } from './components/applicationForm/applicationForm.component';
import { ApplicationTable } from './components/applicationTable/applicationTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Application,
    children: [
      { path: 'form', component: ApplicationForm },
      { path: 'form/:id', component: ApplicationForm },
      { path: 'table', component: ApplicationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
