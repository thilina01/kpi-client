import { Routes, RouterModule } from '@angular/router';

import { DispatchRelease } from './dispatchRelease.component';
import { DispatchReleaseForm } from './components/dispatchReleaseForm/dispatchReleaseForm.component';
import { DispatchReleaseTable } from './components/dispatchReleaseTable/dispatchReleaseTable.component';

const routes: Routes = [
  {
    path: '',
    component: DispatchRelease,
    children: [
      { path: 'form', component: DispatchReleaseForm },
      { path: 'form/:id', component: DispatchReleaseForm },
      { path: 'table', component: DispatchReleaseTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
