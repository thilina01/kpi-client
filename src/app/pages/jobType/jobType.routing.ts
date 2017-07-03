import { Routes, RouterModule }  from '@angular/router';

import { JobType } from './jobType.component';
import { JobTypeForm } from './components/jobTypeForm/jobTypeForm.component';
import { JobTypeTable } from './components/jobTypeTable/jobTypeTable.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: JobType,
     children: [
      { path: 'form', component: JobTypeForm },
      { path: 'form/:id', component: JobTypeForm },
      { path: 'table', component: JobTypeTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
