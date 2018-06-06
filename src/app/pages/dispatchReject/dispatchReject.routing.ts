import { Routes, RouterModule } from '@angular/router';

import { DispatchReject } from './dispatchReject.component';
import { DispatchRejectForm } from './components/dispatchRejectForm/dispatchRejectForm.component';
import { DispatchRejectTable } from './components/dispatchRejectTable/dispatchRejectTable.component';

const routes: Routes = [
  {
    path: '',
    component: DispatchReject,
    children: [
      { path: 'form', component: DispatchRejectForm },
      { path: 'form/:id', component: DispatchRejectForm },
      { path: 'table', component: DispatchRejectTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
