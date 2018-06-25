import { Routes, RouterModule } from '@angular/router';

import { SubcontractRelease } from './subcontractRelease.component';
import { SubcontractReleaseForm } from './components/subcontractReleaseForm/subcontractReleaseForm.component';
import { SubcontractReleaseTable } from './components/subcontractReleaseTable/subcontractReleaseTable.component';

const routes: Routes = [
  {
    path: '',
    component: SubcontractRelease,
    children: [
      { path: 'form', component: SubcontractReleaseForm },
      { path: 'form/:id', component: SubcontractReleaseForm },
      { path: 'table', component: SubcontractReleaseTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
