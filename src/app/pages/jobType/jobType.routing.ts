import { Routes, RouterModule } from '@angular/router';

import { JobType } from './jobType.component';
import { JobTypeForm } from './components/jobTypeForm/jobTypeForm.component';
import { JobTypeTable } from './components/jobTypeTable/jobTypeTable.component';
import { ModuleWithProviders } from '@angular/core';
import { JobTypeImport } from './components/jobTypeImport/jobTypeImport.component';

export const routes: Routes = [
  {
    path: '',
    component: JobType,
    children: [
      { path: 'form', component: JobTypeForm },
      { path: 'form/:id', component: JobTypeForm },
      { path: 'table', component: JobTypeTable },
      { path: 'import', component: JobTypeImport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
