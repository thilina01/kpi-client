import { Routes, RouterModule }  from '@angular/router';

import { Job } from './job.component';
import { JobForm } from './components/jobForm/jobForm.component';
import { JobTable } from './components/jobTable/jobTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Job,
     children: [
      { path: 'form', component: JobForm },
      { path: 'form/:id', component: JobForm },
      { path: 'table', component: JobTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
