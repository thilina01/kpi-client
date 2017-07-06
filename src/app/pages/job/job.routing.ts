import { Routes, RouterModule }  from '@angular/router';

import { Job } from './job.component';
import { JobForm } from './components/jobForm/jobForm.component';
import { JobInfo } from './components/jobInfo/jobInfo.component';
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
      { path: 'info', component: JobInfo },
      { path: 'info/:id', component: JobInfo },
      { path: 'table', component: JobTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
